import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AboutComponent } from './list/about.component';
import { AboutDetailComponent } from './detail/about-detail.component';
import { AboutUpdateComponent } from './update/about-update.component';
import AboutResolve from './route/about-routing-resolve.service';

const aboutRoute: Routes = [
  {
    path: '',
    component: AboutComponent,
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AboutDetailComponent,
    resolve: {
      about: AboutResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AboutUpdateComponent,
    resolve: {
      about: AboutResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AboutUpdateComponent,
    resolve: {
      about: AboutResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default aboutRoute;
