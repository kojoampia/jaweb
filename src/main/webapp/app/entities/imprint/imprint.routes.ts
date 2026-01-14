import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ImprintComponent } from './list/imprint.component';
import { ImprintDetailComponent } from './detail/imprint-detail.component';
import { ImprintUpdateComponent } from './update/imprint-update.component';
import ImprintResolve from './route/imprint-routing-resolve.service';

const imprintRoute: Routes = [
  {
    path: '',
    component: ImprintComponent,
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ImprintDetailComponent,
    resolve: {
      imprint: ImprintResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ImprintUpdateComponent,
    resolve: {
      imprint: ImprintResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ImprintUpdateComponent,
    resolve: {
      imprint: ImprintResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default imprintRoute;
