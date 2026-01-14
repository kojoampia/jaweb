import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PrivilegeComponent } from './list/privilege.component';
import { PrivilegeDetailComponent } from './detail/privilege-detail.component';
import { PrivilegeUpdateComponent } from './update/privilege-update.component';
import PrivilegeResolve from './route/privilege-routing-resolve.service';

const privilegeRoute: Routes = [
  {
    path: '',
    component: PrivilegeComponent,
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PrivilegeDetailComponent,
    resolve: {
      privilege: PrivilegeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PrivilegeUpdateComponent,
    resolve: {
      privilege: PrivilegeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PrivilegeUpdateComponent,
    resolve: {
      privilege: PrivilegeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default privilegeRoute;
