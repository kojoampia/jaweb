import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CareerComponent } from './list/career.component';
import { CareerDetailComponent } from './detail/career-detail.component';
import { CareerUpdateComponent } from './update/career-update.component';
import CareerResolve from './route/career-routing-resolve.service';

const careerRoute: Routes = [
  {
    path: '',
    component: CareerComponent,
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CareerDetailComponent,
    resolve: {
      career: CareerResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CareerUpdateComponent,
    resolve: {
      career: CareerResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CareerUpdateComponent,
    resolve: {
      career: CareerResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default careerRoute;
