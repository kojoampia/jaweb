import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import dayjs from 'dayjs';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

declare const SERVER_API_URL: string;
import { createRequestOption } from 'app/shared';
import { IImprint } from 'app/shared/model/imprint.model';

type EntityResponseType = HttpResponse<IImprint>;
type EntityArrayResponseType = HttpResponse<IImprint[]>;

@Injectable({ providedIn: 'root' })
export class ImprintService {
    public resourceUrl = SERVER_API_URL + 'api/imprints';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/imprints';

    constructor(protected http: HttpClient) {}

    getCurrent(): Observable<EntityResponseType> {
        return this.http
            .get<IImprint>(`${this.resourceUrl}/current`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    create(imprint: IImprint): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(imprint);
        return this.http
            .post<IImprint>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(imprint: IImprint): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(imprint);
        return this.http
            .put<IImprint>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IImprint>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IImprint[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IImprint[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(imprint: IImprint): IImprint {
        const copy: IImprint = Object.assign({}, imprint, {
            createdDate: dayjs.isDayjs(imprint.createdDate) && imprint.createdDate.isValid() ? imprint.createdDate.toJSON() : null,
            modifiedDate: dayjs.isDayjs(imprint.modifiedDate) && imprint.modifiedDate.isValid() ? imprint.modifiedDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.createdDate = res.body.createdDate != null ? dayjs(res.body.createdDate) : null;
            res.body.modifiedDate = res.body.modifiedDate != null ? dayjs(res.body.modifiedDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((imprint: IImprint) => {
                imprint.createdDate = imprint.createdDate != null ? dayjs(imprint.createdDate) : null;
                imprint.modifiedDate = imprint.modifiedDate != null ? dayjs(imprint.modifiedDate) : null;
            });
        }
        return res;
    }
}
