import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICareer } from 'app/shared/model/career.model';

type EntityResponseType = HttpResponse<ICareer>;
type EntityArrayResponseType = HttpResponse<ICareer[]>;

@Injectable({ providedIn: 'root' })
export class CareerService {
    public resourceUrl = SERVER_API_URL + 'api/careers';

    constructor(protected http: HttpClient) {}

    create(career: ICareer): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(career);
        return this.http
            .post<ICareer>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(career: ICareer): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(career);
        return this.http
            .put<ICareer>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<ICareer>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICareer[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(career: ICareer): ICareer {
        const copy: ICareer = Object.assign({}, career, {
            createdDate: career.createdDate != null && career.createdDate.isValid() ? career.createdDate.toJSON() : null,
            modifiedDate: career.modifiedDate != null && career.modifiedDate.isValid() ? career.modifiedDate.toJSON() : null
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
            res.body.forEach((career: ICareer) => {
                career.createdDate = career.createdDate != null ? moment(career.createdDate) : null;
                career.modifiedDate = career.modifiedDate != null ? moment(career.modifiedDate) : null;
            });
        }
        return res;
    }
}
