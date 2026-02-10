import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

declare const SERVER_API_URL: string;
import { createRequestOption } from 'app/shared';
import { IAbout } from 'app/shared/model/about.model';

type EntityResponseType = HttpResponse<IAbout>;
type EntityArrayResponseType = HttpResponse<IAbout[]>;

@Injectable({ providedIn: 'root' })
export class AboutService {
    public resourceUrl = SERVER_API_URL + 'api/abouts';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/abouts';

    constructor(protected http: HttpClient) {}

    create(about: IAbout): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(about);
        return this.http
            .post<IAbout>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(about: IAbout): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(about);
        return this.http
            .put<IAbout>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IAbout>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IAbout[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IAbout[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(about: IAbout): IAbout {
        const copy: IAbout = Object.assign({}, about, {
            createdDate: about.createdDate != null && about.createdDate.isValid() ? about.createdDate.toJSON() : null,
            modifiedDate: about.modifiedDate != null && about.modifiedDate.isValid() ? about.modifiedDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
            res.body.modifiedDate = res.body.modifiedDate != null ? moment(res.body.modifiedDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((about: IAbout) => {
                about.createdDate = about.createdDate != null ? moment(about.createdDate) : null;
                about.modifiedDate = about.modifiedDate != null ? moment(about.modifiedDate) : null;
            });
        }
        return res;
    }
}
