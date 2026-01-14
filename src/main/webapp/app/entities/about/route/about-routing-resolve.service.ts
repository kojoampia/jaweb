import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAbout } from '../about.model';
import { AboutService } from '../service/about.service';

const aboutResolve = (route: ActivatedRouteSnapshot): Observable<null | IAbout> => {
  const id = route.params['id'];
  if (id) {
    return inject(AboutService)
      .find(id)
      .pipe(
        mergeMap((about: HttpResponse<IAbout>) => {
          if (about.body) {
            return of(about.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default aboutResolve;
