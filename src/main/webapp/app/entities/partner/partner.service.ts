import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import dayjs from 'dayjs/esm';
import utc from 'dayjs/esm/plugin/utc';
dayjs.extend(utc);
declare const SERVER_API_URL: string;
import { createRequestOption } from 'app/shared';
import { IPartner } from 'app/shared/model/partner.model';
import { map } from 'rxjs/operators';

type EntityResponseType = HttpResponse<IPartner>;
type EntityArrayResponseType = HttpResponse<IPartner[]>;

@Injectable({ providedIn: 'root' })
export class PartnerService {
  public resourceUrl = SERVER_API_URL + 'api/partners';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/partners';

  constructor(protected http: HttpClient) {}

  create(partner: IPartner): Observable<EntityResponseType> {
    return this.http
      .post<IPartner>(this.resourceUrl, partner, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(partner: IPartner): Observable<EntityResponseType> {
    return this.http
      .put<IPartner>(this.resourceUrl, partner, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IPartner>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPartner[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPartner[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate != null ? dayjs(res.body.createdDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((partner: IPartner) => {
        partner.createdDate = partner.createdDate != null ? dayjs(partner.createdDate) : undefined;
      });
    }
    return res;
  }
}
