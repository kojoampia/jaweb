import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Privilege } from 'app/shared/model/privilege.model';
import { PrivilegeService } from './privilege.service';
import { PrivilegeComponent } from './privilege.component';
import { PrivilegeDetailComponent } from './privilege-detail.component';
import { PrivilegeUpdateComponent } from './privilege-update.component';
import { PrivilegeDeletePopupComponent } from './privilege-delete-dialog.component';
import { IPrivilege } from 'app/shared/model/privilege.model';

@Injectable({ providedIn: 'root' })
export class PrivilegeResolve implements Resolve<IPrivilege> {
    constructor(private service: PrivilegeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPrivilege> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Privilege>) => response.ok),
                map((privilege: HttpResponse<Privilege>) => privilege.body)
            );
        }
        return of(new Privilege());
    }
}

export const privilegeRoute: Routes = [
    {
        path: '',
        component: PrivilegeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Privileges'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PrivilegeDetailComponent,
        resolve: {
            privilege: PrivilegeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Privileges'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PrivilegeUpdateComponent,
        resolve: {
            privilege: PrivilegeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Privileges'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PrivilegeUpdateComponent,
        resolve: {
            privilege: PrivilegeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Privileges'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const privilegePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PrivilegeDeletePopupComponent,
        resolve: {
            privilege: PrivilegeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Privileges'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
