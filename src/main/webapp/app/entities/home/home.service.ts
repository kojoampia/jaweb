import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

declare const SERVER_API_URL: string;
import { createRequestOption } from 'app/shared';
import { IHome } from 'app/shared/model/home.model';

type EntityResponseType = HttpResponse<IHome>;
type EntityArrayResponseType = HttpResponse<IHome[]>;

@Injectable({ providedIn: 'root' })
export class HomeService {
    public resourceUrl = SERVER_API_URL + 'api/homes';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/homes';

    constructor(protected http: HttpClient) {}

    create(home: IHome): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(home);
        return this.http
            .post<IHome>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(home: IHome): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(home);
        return this.http
            .put<IHome>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IHome>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }
    getCurrent() {
        const current = 'current';
        return this.http
            .get<IHome>(`${this.resourceUrl}/${current}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IHome[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IHome[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(home: IHome): IHome {
        const copy: IHome = Object.assign({}, home, {
            createdDate: home.createdDate != null && home.createdDate.isValid() ? home.createdDate.toJSON() : null,
            modifiedDate: home.modifiedDate != null && home.modifiedDate.isValid() ? home.modifiedDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.createdDate = res.body.createdDate != null ? dayjs(res.body.createdDate) : undefined;
            res.body.modifiedDate = res.body.modifiedDate != null ? dayjs(res.body.modifiedDate) : undefined;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((home: IHome) => {
                home.createdDate = home.createdDate != null ? dayjs(home.createdDate) : undefined;
                home.modifiedDate = home.modifiedDate != null ? dayjs(home.modifiedDate) : undefined;
            });
        }
        return res;
    }
}
