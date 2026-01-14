import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPrivilege, NewPrivilege } from '../privilege.model';

export type PartialUpdatePrivilege = Partial<IPrivilege> & Pick<IPrivilege, 'id'>;

type RestOf<T extends IPrivilege | NewPrivilege> = Omit<T, 'createdDate'> & {
  createdDate?: string | null;
};

export type RestPrivilege = RestOf<IPrivilege>;

export type NewRestPrivilege = RestOf<NewPrivilege>;

export type PartialUpdateRestPrivilege = RestOf<PartialUpdatePrivilege>;

export type EntityResponseType = HttpResponse<IPrivilege>;
export type EntityArrayResponseType = HttpResponse<IPrivilege[]>;

@Injectable({ providedIn: 'root' })
export class PrivilegeService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/privileges');

  create(privilege: NewPrivilege): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(privilege);
    return this.http
      .post<RestPrivilege>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(privilege: IPrivilege): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(privilege);
    return this.http
      .put<RestPrivilege>(`${this.resourceUrl}/${this.getPrivilegeIdentifier(privilege)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(privilege: PartialUpdatePrivilege): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(privilege);
    return this.http
      .patch<RestPrivilege>(`${this.resourceUrl}/${this.getPrivilegeIdentifier(privilege)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<RestPrivilege>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPrivilege[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPrivilegeIdentifier(privilege: Pick<IPrivilege, 'id'>): string {
    return privilege.id;
  }

  comparePrivilege(o1: Pick<IPrivilege, 'id'> | null, o2: Pick<IPrivilege, 'id'> | null): boolean {
    return o1 && o2 ? this.getPrivilegeIdentifier(o1) === this.getPrivilegeIdentifier(o2) : o1 === o2;
  }

  addPrivilegeToCollectionIfMissing<Type extends Pick<IPrivilege, 'id'>>(
    privilegeCollection: Type[],
    ...privilegesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const privileges: Type[] = privilegesToCheck.filter(isPresent);
    if (privileges.length > 0) {
      const privilegeCollectionIdentifiers = privilegeCollection.map(privilegeItem => this.getPrivilegeIdentifier(privilegeItem));
      const privilegesToAdd = privileges.filter(privilegeItem => {
        const privilegeIdentifier = this.getPrivilegeIdentifier(privilegeItem);
        if (privilegeCollectionIdentifiers.includes(privilegeIdentifier)) {
          return false;
        }
        privilegeCollectionIdentifiers.push(privilegeIdentifier);
        return true;
      });
      return [...privilegesToAdd, ...privilegeCollection];
    }
    return privilegeCollection;
  }

  protected convertDateFromClient<T extends IPrivilege | NewPrivilege | PartialUpdatePrivilege>(privilege: T): RestOf<T> {
    return {
      ...privilege,
      createdDate: privilege.createdDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restPrivilege: RestPrivilege): IPrivilege {
    return {
      ...restPrivilege,
      createdDate: restPrivilege.createdDate ? dayjs(restPrivilege.createdDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestPrivilege>): HttpResponse<IPrivilege> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestPrivilege[]>): HttpResponse<IPrivilege[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
