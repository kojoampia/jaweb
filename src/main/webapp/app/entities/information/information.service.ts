import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IInformation } from 'app/shared/model/information.model';

type EntityResponseType = HttpResponse<IInformation>;
type EntityArrayResponseType = HttpResponse<IInformation[]>;

@Injectable({ providedIn: 'root' })
export class InformationService {
    public resourceUrl = SERVER_API_URL + 'api/information';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/information';

    constructor(protected http: HttpClient) {}

    create(information: IInformation): Observable<EntityResponseType> {
        return this.http.post<IInformation>(this.resourceUrl, information, { observe: 'response' });
    }

    update(information: IInformation): Observable<EntityResponseType> {
        return this.http.put<IInformation>(this.resourceUrl, information, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IInformation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IInformation[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IInformation[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
