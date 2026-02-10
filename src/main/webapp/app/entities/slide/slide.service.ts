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
import { ISlide } from 'app/shared/model/slide.model';

type EntityResponseType = HttpResponse<ISlide>;
type EntityArrayResponseType = HttpResponse<ISlide[]>;

@Injectable({ providedIn: 'root' })
export class SlideService {
    public resourceUrl = SERVER_API_URL + 'api/slides';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/slides';

    constructor(protected http: HttpClient) {}

    create(slide: ISlide): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(slide);
        return this.http
            .post<ISlide>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(slide: ISlide): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(slide);
        return this.http
            .put<ISlide>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<ISlide>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISlide[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISlide[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(slide: ISlide): ISlide {
        const copy: ISlide = Object.assign({}, slide, {
            createdDate: slide.createdDate != null && slide.createdDate.isValid() ? slide.createdDate.toJSON() : null,
            modifiedDate: slide.modifiedDate != null && slide.modifiedDate.isValid() ? slide.modifiedDate.toJSON() : null
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
            res.body.forEach((slide: ISlide) => {
                slide.createdDate = slide.createdDate != null ? dayjs(slide.createdDate) : null;
                slide.modifiedDate = slide.modifiedDate != null ? dayjs(slide.modifiedDate) : null;
            });
        }
        return res;
    }
}
