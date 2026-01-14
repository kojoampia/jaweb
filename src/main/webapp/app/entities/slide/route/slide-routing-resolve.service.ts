import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISlide } from '../slide.model';
import { SlideService } from '../service/slide.service';

const slideResolve = (route: ActivatedRouteSnapshot): Observable<null | ISlide> => {
  const id = route.params['id'];
  if (id) {
    return inject(SlideService)
      .find(id)
      .pipe(
        mergeMap((slide: HttpResponse<ISlide>) => {
          if (slide.body) {
            return of(slide.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default slideResolve;
