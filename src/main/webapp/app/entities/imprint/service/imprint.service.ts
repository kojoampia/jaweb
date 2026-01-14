import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IImprint, NewImprint } from '../imprint.model';

export type PartialUpdateImprint = Partial<IImprint> & Pick<IImprint, 'id'>;

type RestOf<T extends IImprint | NewImprint> = Omit<T, 'createdDate' | 'modifiedDate'> & {
  createdDate?: string | null;
  modifiedDate?: string | null;
};

export type RestImprint = RestOf<IImprint>;

export type NewRestImprint = RestOf<NewImprint>;

export type PartialUpdateRestImprint = RestOf<PartialUpdateImprint>;

export type EntityResponseType = HttpResponse<IImprint>;
export type EntityArrayResponseType = HttpResponse<IImprint[]>;

@Injectable({ providedIn: 'root' })
export class ImprintService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/imprints');

  create(imprint: NewImprint): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(imprint);
    return this.http
      .post<RestImprint>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(imprint: IImprint): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(imprint);
    return this.http
      .put<RestImprint>(`${this.resourceUrl}/${this.getImprintIdentifier(imprint)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(imprint: PartialUpdateImprint): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(imprint);
    return this.http
      .patch<RestImprint>(`${this.resourceUrl}/${this.getImprintIdentifier(imprint)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<RestImprint>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestImprint[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getImprintIdentifier(imprint: Pick<IImprint, 'id'>): string {
    return imprint.id;
  }

  compareImprint(o1: Pick<IImprint, 'id'> | null, o2: Pick<IImprint, 'id'> | null): boolean {
    return o1 && o2 ? this.getImprintIdentifier(o1) === this.getImprintIdentifier(o2) : o1 === o2;
  }

  addImprintToCollectionIfMissing<Type extends Pick<IImprint, 'id'>>(
    imprintCollection: Type[],
    ...imprintsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const imprints: Type[] = imprintsToCheck.filter(isPresent);
    if (imprints.length > 0) {
      const imprintCollectionIdentifiers = imprintCollection.map(imprintItem => this.getImprintIdentifier(imprintItem));
      const imprintsToAdd = imprints.filter(imprintItem => {
        const imprintIdentifier = this.getImprintIdentifier(imprintItem);
        if (imprintCollectionIdentifiers.includes(imprintIdentifier)) {
          return false;
        }
        imprintCollectionIdentifiers.push(imprintIdentifier);
        return true;
      });
      return [...imprintsToAdd, ...imprintCollection];
    }
    return imprintCollection;
  }

  protected convertDateFromClient<T extends IImprint | NewImprint | PartialUpdateImprint>(imprint: T): RestOf<T> {
    return {
      ...imprint,
      createdDate: imprint.createdDate?.toJSON() ?? null,
      modifiedDate: imprint.modifiedDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restImprint: RestImprint): IImprint {
    return {
      ...restImprint,
      createdDate: restImprint.createdDate ? dayjs(restImprint.createdDate) : undefined,
      modifiedDate: restImprint.modifiedDate ? dayjs(restImprint.modifiedDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestImprint>): HttpResponse<IImprint> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestImprint[]>): HttpResponse<IImprint[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
