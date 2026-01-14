import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAbout, NewAbout } from '../about.model';

export type PartialUpdateAbout = Partial<IAbout> & Pick<IAbout, 'id'>;

type RestOf<T extends IAbout | NewAbout> = Omit<T, 'createdDate' | 'modifiedDate'> & {
  createdDate?: string | null;
  modifiedDate?: string | null;
};

export type RestAbout = RestOf<IAbout>;

export type NewRestAbout = RestOf<NewAbout>;

export type PartialUpdateRestAbout = RestOf<PartialUpdateAbout>;

export type EntityResponseType = HttpResponse<IAbout>;
export type EntityArrayResponseType = HttpResponse<IAbout[]>;

@Injectable({ providedIn: 'root' })
export class AboutService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/abouts');

  create(about: NewAbout): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(about);
    return this.http.post<RestAbout>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(about: IAbout): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(about);
    return this.http
      .put<RestAbout>(`${this.resourceUrl}/${this.getAboutIdentifier(about)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(about: PartialUpdateAbout): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(about);
    return this.http
      .patch<RestAbout>(`${this.resourceUrl}/${this.getAboutIdentifier(about)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<RestAbout>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAbout[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAboutIdentifier(about: Pick<IAbout, 'id'>): string {
    return about.id;
  }

  compareAbout(o1: Pick<IAbout, 'id'> | null, o2: Pick<IAbout, 'id'> | null): boolean {
    return o1 && o2 ? this.getAboutIdentifier(o1) === this.getAboutIdentifier(o2) : o1 === o2;
  }

  addAboutToCollectionIfMissing<Type extends Pick<IAbout, 'id'>>(
    aboutCollection: Type[],
    ...aboutsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const abouts: Type[] = aboutsToCheck.filter(isPresent);
    if (abouts.length > 0) {
      const aboutCollectionIdentifiers = aboutCollection.map(aboutItem => this.getAboutIdentifier(aboutItem));
      const aboutsToAdd = abouts.filter(aboutItem => {
        const aboutIdentifier = this.getAboutIdentifier(aboutItem);
        if (aboutCollectionIdentifiers.includes(aboutIdentifier)) {
          return false;
        }
        aboutCollectionIdentifiers.push(aboutIdentifier);
        return true;
      });
      return [...aboutsToAdd, ...aboutCollection];
    }
    return aboutCollection;
  }

  protected convertDateFromClient<T extends IAbout | NewAbout | PartialUpdateAbout>(about: T): RestOf<T> {
    return {
      ...about,
      createdDate: about.createdDate?.toJSON() ?? null,
      modifiedDate: about.modifiedDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restAbout: RestAbout): IAbout {
    return {
      ...restAbout,
      createdDate: restAbout.createdDate ? dayjs(restAbout.createdDate) : undefined,
      modifiedDate: restAbout.modifiedDate ? dayjs(restAbout.modifiedDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestAbout>): HttpResponse<IAbout> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestAbout[]>): HttpResponse<IAbout[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
