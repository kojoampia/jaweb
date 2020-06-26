import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBlog } from 'app/shared/model/blog.model';

type EntityResponseType = HttpResponse<IBlog>;
type EntityArrayResponseType = HttpResponse<IBlog[]>;

@Injectable({ providedIn: 'root' })
export class BlogService {
    public resourceUrl = SERVER_API_URL + 'api/blogs';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/blogs';

    constructor(protected http: HttpClient) {}

    create(blog: IBlog): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(blog);
        return this.http
            .post<IBlog>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(blog: IBlog): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(blog);
        return this.http
            .put<IBlog>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IBlog>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBlog[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    getRecentBlogs(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBlog[]>(`${this.resourceUrl}/recent`, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    getArchives(): Observable<EntityArrayResponseType> {
        return this.http.get<any>(`${this.resourceUrl}/archive`, { observe: 'response' });
    }

    getArchivesByYear(year?: number): Observable<EntityArrayResponseType> {
        return this.http.get<any>(`${this.resourceUrl}/archive/${year}`, { observe: 'response' });
    }

    getArchivesByYearMonth(year?: number, month?: number): Observable<EntityArrayResponseType> {
        return this.http.get<any>(`${this.resourceUrl}/archive/${year}/${month}`, { observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBlog[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(blog: IBlog): IBlog {
        const copy: IBlog = Object.assign({}, blog, {
            createdDate: blog.createdDate != null && blog.createdDate.isValid() ? blog.createdDate.toJSON() : null,
            modifiedDate: blog.modifiedDate != null && blog.modifiedDate.isValid() ? blog.modifiedDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : undefined;
            res.body.modifiedDate = res.body.modifiedDate != null ? moment(res.body.modifiedDate) : undefined;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((blog: IBlog) => {
                blog.createdDate = blog.createdDate != null ? moment(blog.createdDate) : undefined;
                blog.modifiedDate = blog.modifiedDate != null ? moment(blog.modifiedDate) : undefined;
            });
        }
        return res;
    }
}
