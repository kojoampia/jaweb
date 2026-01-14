import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPortfolio, NewPortfolio } from '../portfolio.model';

export type PartialUpdatePortfolio = Partial<IPortfolio> & Pick<IPortfolio, 'id'>;

type RestOf<T extends IPortfolio | NewPortfolio> = Omit<T, 'createdDate' | 'modifiedDate'> & {
  createdDate?: string | null;
  modifiedDate?: string | null;
};

export type RestPortfolio = RestOf<IPortfolio>;

export type NewRestPortfolio = RestOf<NewPortfolio>;

export type PartialUpdateRestPortfolio = RestOf<PartialUpdatePortfolio>;

export type EntityResponseType = HttpResponse<IPortfolio>;
export type EntityArrayResponseType = HttpResponse<IPortfolio[]>;

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/portfolios');

  create(portfolio: NewPortfolio): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(portfolio);
    return this.http
      .post<RestPortfolio>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(portfolio: IPortfolio): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(portfolio);
    return this.http
      .put<RestPortfolio>(`${this.resourceUrl}/${this.getPortfolioIdentifier(portfolio)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(portfolio: PartialUpdatePortfolio): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(portfolio);
    return this.http
      .patch<RestPortfolio>(`${this.resourceUrl}/${this.getPortfolioIdentifier(portfolio)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<RestPortfolio>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPortfolio[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPortfolioIdentifier(portfolio: Pick<IPortfolio, 'id'>): string {
    return portfolio.id;
  }

  comparePortfolio(o1: Pick<IPortfolio, 'id'> | null, o2: Pick<IPortfolio, 'id'> | null): boolean {
    return o1 && o2 ? this.getPortfolioIdentifier(o1) === this.getPortfolioIdentifier(o2) : o1 === o2;
  }

  addPortfolioToCollectionIfMissing<Type extends Pick<IPortfolio, 'id'>>(
    portfolioCollection: Type[],
    ...portfoliosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const portfolios: Type[] = portfoliosToCheck.filter(isPresent);
    if (portfolios.length > 0) {
      const portfolioCollectionIdentifiers = portfolioCollection.map(portfolioItem => this.getPortfolioIdentifier(portfolioItem));
      const portfoliosToAdd = portfolios.filter(portfolioItem => {
        const portfolioIdentifier = this.getPortfolioIdentifier(portfolioItem);
        if (portfolioCollectionIdentifiers.includes(portfolioIdentifier)) {
          return false;
        }
        portfolioCollectionIdentifiers.push(portfolioIdentifier);
        return true;
      });
      return [...portfoliosToAdd, ...portfolioCollection];
    }
    return portfolioCollection;
  }

  protected convertDateFromClient<T extends IPortfolio | NewPortfolio | PartialUpdatePortfolio>(portfolio: T): RestOf<T> {
    return {
      ...portfolio,
      createdDate: portfolio.createdDate?.toJSON() ?? null,
      modifiedDate: portfolio.modifiedDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restPortfolio: RestPortfolio): IPortfolio {
    return {
      ...restPortfolio,
      createdDate: restPortfolio.createdDate ? dayjs(restPortfolio.createdDate) : undefined,
      modifiedDate: restPortfolio.modifiedDate ? dayjs(restPortfolio.modifiedDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestPortfolio>): HttpResponse<IPortfolio> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestPortfolio[]>): HttpResponse<IPortfolio[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
