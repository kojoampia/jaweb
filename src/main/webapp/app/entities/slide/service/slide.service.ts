import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISlide, NewSlide } from '../slide.model';

export type PartialUpdateSlide = Partial<ISlide> & Pick<ISlide, 'id'>;

type RestOf<T extends ISlide | NewSlide> = Omit<T, 'createdDate' | 'modifiedDate'> & {
  createdDate?: string | null;
  modifiedDate?: string | null;
};

export type RestSlide = RestOf<ISlide>;

export type NewRestSlide = RestOf<NewSlide>;

export type PartialUpdateRestSlide = RestOf<PartialUpdateSlide>;

export type EntityResponseType = HttpResponse<ISlide>;
export type EntityArrayResponseType = HttpResponse<ISlide[]>;

@Injectable({ providedIn: 'root' })
export class SlideService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/slides');

  create(slide: NewSlide): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(slide);
    return this.http.post<RestSlide>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(slide: ISlide): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(slide);
    return this.http
      .put<RestSlide>(`${this.resourceUrl}/${this.getSlideIdentifier(slide)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(slide: PartialUpdateSlide): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(slide);
    return this.http
      .patch<RestSlide>(`${this.resourceUrl}/${this.getSlideIdentifier(slide)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<RestSlide>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestSlide[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSlideIdentifier(slide: Pick<ISlide, 'id'>): string {
    return slide.id;
  }

  compareSlide(o1: Pick<ISlide, 'id'> | null, o2: Pick<ISlide, 'id'> | null): boolean {
    return o1 && o2 ? this.getSlideIdentifier(o1) === this.getSlideIdentifier(o2) : o1 === o2;
  }

  addSlideToCollectionIfMissing<Type extends Pick<ISlide, 'id'>>(
    slideCollection: Type[],
    ...slidesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const slides: Type[] = slidesToCheck.filter(isPresent);
    if (slides.length > 0) {
      const slideCollectionIdentifiers = slideCollection.map(slideItem => this.getSlideIdentifier(slideItem));
      const slidesToAdd = slides.filter(slideItem => {
        const slideIdentifier = this.getSlideIdentifier(slideItem);
        if (slideCollectionIdentifiers.includes(slideIdentifier)) {
          return false;
        }
        slideCollectionIdentifiers.push(slideIdentifier);
        return true;
      });
      return [...slidesToAdd, ...slideCollection];
    }
    return slideCollection;
  }

  protected convertDateFromClient<T extends ISlide | NewSlide | PartialUpdateSlide>(slide: T): RestOf<T> {
    return {
      ...slide,
      createdDate: slide.createdDate?.toJSON() ?? null,
      modifiedDate: slide.modifiedDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restSlide: RestSlide): ISlide {
    return {
      ...restSlide,
      createdDate: restSlide.createdDate ? dayjs(restSlide.createdDate) : undefined,
      modifiedDate: restSlide.modifiedDate ? dayjs(restSlide.modifiedDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestSlide>): HttpResponse<ISlide> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestSlide[]>): HttpResponse<ISlide[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
