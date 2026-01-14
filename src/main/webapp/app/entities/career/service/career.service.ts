import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICareer, NewCareer } from '../career.model';

export type PartialUpdateCareer = Partial<ICareer> & Pick<ICareer, 'id'>;

type RestOf<T extends ICareer | NewCareer> = Omit<T, 'createdDate' | 'modifiedDate'> & {
  createdDate?: string | null;
  modifiedDate?: string | null;
};

export type RestCareer = RestOf<ICareer>;

export type NewRestCareer = RestOf<NewCareer>;

export type PartialUpdateRestCareer = RestOf<PartialUpdateCareer>;

export type EntityResponseType = HttpResponse<ICareer>;
export type EntityArrayResponseType = HttpResponse<ICareer[]>;

@Injectable({ providedIn: 'root' })
export class CareerService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/careers');

  create(career: NewCareer): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(career);
    return this.http
      .post<RestCareer>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(career: ICareer): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(career);
    return this.http
      .put<RestCareer>(`${this.resourceUrl}/${this.getCareerIdentifier(career)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(career: PartialUpdateCareer): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(career);
    return this.http
      .patch<RestCareer>(`${this.resourceUrl}/${this.getCareerIdentifier(career)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<RestCareer>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCareer[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCareerIdentifier(career: Pick<ICareer, 'id'>): string {
    return career.id;
  }

  compareCareer(o1: Pick<ICareer, 'id'> | null, o2: Pick<ICareer, 'id'> | null): boolean {
    return o1 && o2 ? this.getCareerIdentifier(o1) === this.getCareerIdentifier(o2) : o1 === o2;
  }

  addCareerToCollectionIfMissing<Type extends Pick<ICareer, 'id'>>(
    careerCollection: Type[],
    ...careersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const careers: Type[] = careersToCheck.filter(isPresent);
    if (careers.length > 0) {
      const careerCollectionIdentifiers = careerCollection.map(careerItem => this.getCareerIdentifier(careerItem));
      const careersToAdd = careers.filter(careerItem => {
        const careerIdentifier = this.getCareerIdentifier(careerItem);
        if (careerCollectionIdentifiers.includes(careerIdentifier)) {
          return false;
        }
        careerCollectionIdentifiers.push(careerIdentifier);
        return true;
      });
      return [...careersToAdd, ...careerCollection];
    }
    return careerCollection;
  }

  protected convertDateFromClient<T extends ICareer | NewCareer | PartialUpdateCareer>(career: T): RestOf<T> {
    return {
      ...career,
      createdDate: career.createdDate?.toJSON() ?? null,
      modifiedDate: career.modifiedDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restCareer: RestCareer): ICareer {
    return {
      ...restCareer,
      createdDate: restCareer.createdDate ? dayjs(restCareer.createdDate) : undefined,
      modifiedDate: restCareer.modifiedDate ? dayjs(restCareer.modifiedDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCareer>): HttpResponse<ICareer> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCareer[]>): HttpResponse<ICareer[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
