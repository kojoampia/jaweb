import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IService, NewService } from '../service.model';

export type PartialUpdateService = Partial<IService> & Pick<IService, 'id'>;

type RestOf<T extends IService | NewService> = Omit<T, 'createdDate' | 'modifiedDate'> & {
  createdDate?: string | null;
  modifiedDate?: string | null;
};

export type RestService = RestOf<IService>;

export type NewRestService = RestOf<NewService>;

export type PartialUpdateRestService = RestOf<PartialUpdateService>;

export type EntityResponseType = HttpResponse<IService>;
export type EntityArrayResponseType = HttpResponse<IService[]>;

@Injectable({ providedIn: 'root' })
export class ServiceService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/services');

  create(service: NewService): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(service);
    return this.http
      .post<RestService>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(service: IService): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(service);
    return this.http
      .put<RestService>(`${this.resourceUrl}/${this.getServiceIdentifier(service)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(service: PartialUpdateService): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(service);
    return this.http
      .patch<RestService>(`${this.resourceUrl}/${this.getServiceIdentifier(service)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<RestService>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestService[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getServiceIdentifier(service: Pick<IService, 'id'>): string {
    return service.id;
  }

  compareService(o1: Pick<IService, 'id'> | null, o2: Pick<IService, 'id'> | null): boolean {
    return o1 && o2 ? this.getServiceIdentifier(o1) === this.getServiceIdentifier(o2) : o1 === o2;
  }

  addServiceToCollectionIfMissing<Type extends Pick<IService, 'id'>>(
    serviceCollection: Type[],
    ...servicesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const services: Type[] = servicesToCheck.filter(isPresent);
    if (services.length > 0) {
      const serviceCollectionIdentifiers = serviceCollection.map(serviceItem => this.getServiceIdentifier(serviceItem));
      const servicesToAdd = services.filter(serviceItem => {
        const serviceIdentifier = this.getServiceIdentifier(serviceItem);
        if (serviceCollectionIdentifiers.includes(serviceIdentifier)) {
          return false;
        }
        serviceCollectionIdentifiers.push(serviceIdentifier);
        return true;
      });
      return [...servicesToAdd, ...serviceCollection];
    }
    return serviceCollection;
  }

  protected convertDateFromClient<T extends IService | NewService | PartialUpdateService>(service: T): RestOf<T> {
    return {
      ...service,
      createdDate: service.createdDate?.toJSON() ?? null,
      modifiedDate: service.modifiedDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restService: RestService): IService {
    return {
      ...restService,
      createdDate: restService.createdDate ? dayjs(restService.createdDate) : undefined,
      modifiedDate: restService.modifiedDate ? dayjs(restService.modifiedDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestService>): HttpResponse<IService> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestService[]>): HttpResponse<IService[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
