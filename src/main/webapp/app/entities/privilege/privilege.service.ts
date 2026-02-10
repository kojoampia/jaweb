import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

declare const SERVER_API_URL: string;
import { createRequestOption } from 'app/shared';
import { IPrivilege } from 'app/shared/model/privilege.model';

type EntityResponseType = HttpResponse<IPrivilege>;
type EntityArrayResponseType = HttpResponse<IPrivilege[]>;

@Injectable({ providedIn: 'root' })
export class PrivilegeService {
    public resourceUrl = SERVER_API_URL + 'api/privileges';

    constructor(protected http: HttpClient) {}

    create(privilege: IPrivilege): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(privilege);
        return this.http
            .post<IPrivilege>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(privilege: IPrivilege): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(privilege);
        return this.http
            .put<IPrivilege>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IPrivilege>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPrivilege[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(privilege: IPrivilege): IPrivilege {
        const copy: IPrivilege = Object.assign({}, privilege, {
            createdDate: privilege.createdDate != null && privilege.createdDate.isValid() ? privilege.createdDate.toJSON() : null
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
            res.body.forEach((privilege: IPrivilege) => {
                privilege.createdDate = privilege.createdDate != null ? moment(privilege.createdDate) : null;
            });
        }
        return res;
    }
}
