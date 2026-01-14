import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IImprint } from '../imprint.model';
import { ImprintService } from '../service/imprint.service';

const imprintResolve = (route: ActivatedRouteSnapshot): Observable<null | IImprint> => {
  const id = route.params['id'];
  if (id) {
    return inject(ImprintService)
      .find(id)
      .pipe(
        mergeMap((imprint: HttpResponse<IImprint>) => {
          if (imprint.body) {
            return of(imprint.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default imprintResolve;
