import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IContactMessage } from 'app/shared/model/contact-message.model';

type EntityResponseType = HttpResponse<IContactMessage>;
type EntityArrayResponseType = HttpResponse<IContactMessage[]>;

@Injectable({ providedIn: 'root' })
export class ContactMessageService {
    public resourceUrl = SERVER_API_URL + 'api/contact-messages';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/contact-messages';

    constructor(protected http: HttpClient) {}

    create(contactMessage: IContactMessage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(contactMessage);
        return this.http
            .post<IContactMessage>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(contactMessage: IContactMessage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(contactMessage);
        return this.http
            .put<IContactMessage>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IContactMessage>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IContactMessage[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IContactMessage[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(contactMessage: IContactMessage): IContactMessage {
        const copy: IContactMessage = Object.assign({}, contactMessage, {
            createdDate:
                contactMessage.createdDate != null && contactMessage.createdDate.isValid() ? contactMessage.createdDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((contactMessage: IContactMessage) => {
                contactMessage.createdDate = contactMessage.createdDate != null ? moment(contactMessage.createdDate) : null;
            });
        }
        return res;
    }
}
