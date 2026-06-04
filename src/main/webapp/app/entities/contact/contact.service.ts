import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import dayjs from 'dayjs/esm';
import utc from 'dayjs/esm/plugin/utc';
dayjs.extend(utc);
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

declare const SERVER_API_URL: string;
import { createRequestOption } from 'app/shared';
import { IContact } from 'app/shared/model/contact.model';
import { IContactMessage } from 'app/shared/model/contact-message.model';

type EntityResponseType = HttpResponse<IContact>;
type EntityArrayResponseType = HttpResponse<IContact[]>;

@Injectable({ providedIn: 'root' })
export class ContactService {
    public resourceUrl = SERVER_API_URL + 'api/contacts';
    public messageResourceUrl = SERVER_API_URL + 'api/contact-messages';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/contacts';
    public messageResourceSearchUrl = SERVER_API_URL + 'api/_search/contact-messages';

    constructor(protected http: HttpClient) {}

    postMessage(contactMessage: IContactMessage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(contactMessage);
        return this.http
            .post<IContactMessage>(this.messageResourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    updateMessage(contact: IContactMessage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(contact);
        return this.http
            .put<IContactMessage>(this.messageResourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    findMessage(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IContactMessage>(`${this.messageResourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    readMessages(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IContactMessage[]>(this.messageResourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    deleteMessage(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.messageResourceUrl}/${id}`, { observe: 'response' });
    }

    searchMessage(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IContactMessage[]>(this.messageResourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    create(contact: IContact): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(contact);
        return this.http
            .post<IContact>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(contact: IContact): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(contact);
        return this.http
            .put<IContact>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IContact>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IContact[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IContact[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(contact: IContact): IContact {
        const copy: IContact = Object.assign({}, contact, {
            lastModified: contact.lastModified != null && contact.lastModified.isValid() ? contact.lastModified.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.lastModified = res.body.lastModified != null ? dayjs(res.body.lastModified) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((contact: IContact) => {
                contact.lastModified = contact.lastModified != null ? dayjs(contact.lastModified) : null;
            });
        }
        return res;
    }
}
