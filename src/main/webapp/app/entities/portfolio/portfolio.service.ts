import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPortfolio } from 'app/shared/model/portfolio.model';

type EntityResponseType = HttpResponse<IPortfolio>;
type EntityArrayResponseType = HttpResponse<IPortfolio[]>;

@Injectable({ providedIn: 'root' })
export class PortfolioService {
    public resourceUrl = SERVER_API_URL + 'api/portfolios';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/portfolios';

    constructor(protected http: HttpClient) {}

    create(portfolio: IPortfolio): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(portfolio);
        return this.http
            .post<IPortfolio>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(portfolio: IPortfolio): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(portfolio);
        return this.http
            .put<IPortfolio>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IPortfolio>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPortfolio[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPortfolio[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(portfolio: IPortfolio): IPortfolio {
        const copy: IPortfolio = Object.assign({}, portfolio, {
            createdDate: portfolio.createdDate != null && portfolio.createdDate.isValid() ? portfolio.createdDate.toJSON() : null,
            modifiedDate: portfolio.modifiedDate != null && portfolio.modifiedDate.isValid() ? portfolio.modifiedDate.toJSON() : null
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
            res.body.forEach((portfolio: IPortfolio) => {
                portfolio.createdDate = portfolio.createdDate != null ? moment(portfolio.createdDate) : null;
                portfolio.modifiedDate = portfolio.modifiedDate != null ? moment(portfolio.modifiedDate) : null;
            });
        }
        return res;
    }
}
