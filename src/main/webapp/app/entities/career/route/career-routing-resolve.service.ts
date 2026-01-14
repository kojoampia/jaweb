import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICareer } from '../career.model';
import { CareerService } from '../service/career.service';

const careerResolve = (route: ActivatedRouteSnapshot): Observable<null | ICareer> => {
  const id = route.params['id'];
  if (id) {
    return inject(CareerService)
      .find(id)
      .pipe(
        mergeMap((career: HttpResponse<ICareer>) => {
          if (career.body) {
            return of(career.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default careerResolve;
