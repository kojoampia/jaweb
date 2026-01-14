import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SlideComponent } from './list/slide.component';
import { SlideDetailComponent } from './detail/slide-detail.component';
import { SlideUpdateComponent } from './update/slide-update.component';
import SlideResolve from './route/slide-routing-resolve.service';

const slideRoute: Routes = [
  {
    path: '',
    component: SlideComponent,
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SlideDetailComponent,
    resolve: {
      slide: SlideResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SlideUpdateComponent,
    resolve: {
      slide: SlideResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SlideUpdateComponent,
    resolve: {
      slide: SlideResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default slideRoute;
