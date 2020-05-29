import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Imprint } from 'app/shared/model/imprint.model';
import { ImprintService } from './imprint.service';
import { ImprintComponent } from './imprint.component';
import { ImprintDetailComponent } from './imprint-detail.component';
import { ImprintUpdateComponent } from './imprint-update.component';
import { ImprintDeletePopupComponent } from './imprint-delete-dialog.component';
import { IImprint } from 'app/shared/model/imprint.model';
import { ImprintViewComponent } from '.';

@Injectable({ providedIn: 'root' })
export class ImprintResolve implements Resolve<IImprint> {
    constructor(private service: ImprintService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IImprint> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: any) => response.ok),
                map((imprint: any) => imprint.body)
            );
        }
        return of(new Imprint());
    }
}

export const imprintRoute: Routes = [
    {
        path: '',
        component: ImprintViewComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: [],
            defaultSort: 'modifiedDate,desc',
            pageTitle: 'Legal Notice'
        }
    },
    {
        path: 'dashboard',
        component: ImprintComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'modifiedDate,desc',
            pageTitle: 'Legal Notice Management Dashboard'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ImprintDetailComponent,
        resolve: {
            imprint: ImprintResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Detail Legal Notice'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ImprintUpdateComponent,
        resolve: {
            imprint: ImprintResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'New Legal Notice'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ImprintUpdateComponent,
        resolve: {
            imprint: ImprintResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Edit Legal Notice'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const imprintPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ImprintDeletePopupComponent,
        resolve: {
            imprint: ImprintResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Delete Legal Notice'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
