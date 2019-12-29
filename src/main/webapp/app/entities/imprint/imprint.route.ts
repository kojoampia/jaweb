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

@Injectable({ providedIn: 'root' })
export class ImprintResolve implements Resolve<IImprint> {
    constructor(private service: ImprintService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IImprint> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Imprint>) => response.ok),
                map((imprint: HttpResponse<Imprint>) => imprint.body)
            );
        }
        return of(new Imprint());
    }
}

export const imprintRoute: Routes = [
    {
        path: '',
        component: ImprintComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Imprints'
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
            pageTitle: 'Imprints'
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
            pageTitle: 'Imprints'
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
            pageTitle: 'Imprints'
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
            pageTitle: 'Imprints'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
