import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStaff } from 'app/shared/model/staff.model';

type EntityResponseType = HttpResponse<IStaff>;
type EntityArrayResponseType = HttpResponse<IStaff[]>;

@Injectable({ providedIn: 'root' })
export class StaffService {
    public resourceUrl = SERVER_API_URL + 'api/staff';

    constructor(protected http: HttpClient) {}

    create(staff: IStaff): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(staff);
        return this.http
            .post<IStaff>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(staff: IStaff): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(staff);
        return this.http
            .put<IStaff>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IStaff>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IStaff[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(staff: IStaff): IStaff {
        const copy: IStaff = Object.assign({}, staff, {
            dateOfBirth: staff.dateOfBirth != null && staff.dateOfBirth.isValid() ? staff.dateOfBirth.format(DATE_FORMAT) : null,
            createdDate: staff.createdDate != null && staff.createdDate.isValid() ? staff.createdDate.toJSON() : null,
            modifiedDate: staff.modifiedDate != null && staff.modifiedDate.isValid() ? staff.modifiedDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.dateOfBirth = res.body.dateOfBirth != null ? moment(res.body.dateOfBirth) : null;
            res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
            res.body.modifiedDate = res.body.modifiedDate != null ? moment(res.body.modifiedDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((staff: IStaff) => {
                staff.dateOfBirth = staff.dateOfBirth != null ? moment(staff.dateOfBirth) : null;
                staff.createdDate = staff.createdDate != null ? moment(staff.createdDate) : null;
                staff.modifiedDate = staff.modifiedDate != null ? moment(staff.modifiedDate) : null;
            });
        }
        return res;
    }
}
