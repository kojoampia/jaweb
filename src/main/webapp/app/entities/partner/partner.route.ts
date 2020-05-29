import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Partner } from 'app/shared/model/partner.model';
import { PartnerService } from './partner.service';
import { PartnerComponent } from './partner.component';
import { PartnerDetailComponent } from './partner-detail.component';
import { PartnerUpdateComponent } from './partner-update.component';
import { PartnerDeletePopupComponent } from './partner-delete-dialog.component';
import { IPartner } from 'app/shared/model/partner.model';
import { PartnerViewComponent } from '.';

@Injectable({ providedIn: 'root' })
export class PartnerResolve implements Resolve<IPartner> {
    constructor(private service: PartnerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPartner> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: any) => response.ok),
                map((partner: any) => partner.body)
            );
        }
        return of(new Partner());
    }
}

export const partnerRoute: Routes = [
    {
        path: '',
        component: PartnerViewComponent,
        data: {
            authorities: [],
            pageTitle: 'Partners'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dashboard',
        component: PartnerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Partners'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PartnerDetailComponent,
        resolve: {
            partner: PartnerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Partners'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PartnerUpdateComponent,
        resolve: {
            partner: PartnerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Partners'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PartnerUpdateComponent,
        resolve: {
            partner: PartnerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Partners'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const partnerPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PartnerDeletePopupComponent,
        resolve: {
            partner: PartnerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Partners'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
