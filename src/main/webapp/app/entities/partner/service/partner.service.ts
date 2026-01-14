import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPartner, NewPartner } from '../partner.model';

export type PartialUpdatePartner = Partial<IPartner> & Pick<IPartner, 'id'>;

type RestOf<T extends IPartner | NewPartner> = Omit<T, 'createdDate'> & {
  createdDate?: string | null;
};

export type RestPartner = RestOf<IPartner>;

export type NewRestPartner = RestOf<NewPartner>;

export type PartialUpdateRestPartner = RestOf<PartialUpdatePartner>;

export type EntityResponseType = HttpResponse<IPartner>;
export type EntityArrayResponseType = HttpResponse<IPartner[]>;

@Injectable({ providedIn: 'root' })
export class PartnerService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/partners');

  create(partner: NewPartner): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(partner);
    return this.http
      .post<RestPartner>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(partner: IPartner): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(partner);
    return this.http
      .put<RestPartner>(`${this.resourceUrl}/${this.getPartnerIdentifier(partner)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(partner: PartialUpdatePartner): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(partner);
    return this.http
      .patch<RestPartner>(`${this.resourceUrl}/${this.getPartnerIdentifier(partner)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<RestPartner>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPartner[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPartnerIdentifier(partner: Pick<IPartner, 'id'>): string {
    return partner.id;
  }

  comparePartner(o1: Pick<IPartner, 'id'> | null, o2: Pick<IPartner, 'id'> | null): boolean {
    return o1 && o2 ? this.getPartnerIdentifier(o1) === this.getPartnerIdentifier(o2) : o1 === o2;
  }

  addPartnerToCollectionIfMissing<Type extends Pick<IPartner, 'id'>>(
    partnerCollection: Type[],
    ...partnersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const partners: Type[] = partnersToCheck.filter(isPresent);
    if (partners.length > 0) {
      const partnerCollectionIdentifiers = partnerCollection.map(partnerItem => this.getPartnerIdentifier(partnerItem));
      const partnersToAdd = partners.filter(partnerItem => {
        const partnerIdentifier = this.getPartnerIdentifier(partnerItem);
        if (partnerCollectionIdentifiers.includes(partnerIdentifier)) {
          return false;
        }
        partnerCollectionIdentifiers.push(partnerIdentifier);
        return true;
      });
      return [...partnersToAdd, ...partnerCollection];
    }
    return partnerCollection;
  }

  protected convertDateFromClient<T extends IPartner | NewPartner | PartialUpdatePartner>(partner: T): RestOf<T> {
    return {
      ...partner,
      createdDate: partner.createdDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restPartner: RestPartner): IPartner {
    return {
      ...restPartner,
      createdDate: restPartner.createdDate ? dayjs(restPartner.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestPartner>): HttpResponse<IPartner> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestPartner[]>): HttpResponse<IPartner[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
