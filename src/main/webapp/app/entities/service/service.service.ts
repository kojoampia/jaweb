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
import { IService } from 'app/shared/model/service.model';

type EntityResponseType = HttpResponse<IService>;
type EntityArrayResponseType = HttpResponse<IService[]>;

@Injectable({ providedIn: 'root' })
export class ServiceService {
    public resourceUrl = SERVER_API_URL + 'api/services';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/services';

    constructor(protected http: HttpClient) {}

    create(service: IService): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(service);
        return this.http
            .post<IService>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(service: IService): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(service);
        return this.http
            .put<IService>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IService>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IService[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IService[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(service: IService): IService {
        const copy: IService = Object.assign({}, service, {
            createdDate: service.createdDate != null && service.createdDate.isValid() ? service.createdDate.toJSON() : null,
            modifiedDate: service.modifiedDate != null && service.modifiedDate.isValid() ? service.modifiedDate.toJSON() : null
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
            res.body.forEach((service: IService) => {
                service.createdDate = service.createdDate != null ? dayjs(service.createdDate) : null;
                service.modifiedDate = service.modifiedDate != null ? dayjs(service.modifiedDate) : null;
            });
        }
        return res;
    }
}
