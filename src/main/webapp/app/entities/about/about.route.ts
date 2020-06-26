import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { About } from 'app/shared/model/about.model';
import { AboutService } from './about.service';
import { AboutComponent } from './about.component';
import { AboutDetailComponent } from './about-detail.component';
import { AboutUpdateComponent } from './about-update.component';
import { AboutDeletePopupComponent } from './about-delete-dialog.component';
import { IAbout } from 'app/shared/model/about.model';
import { AboutViewComponent } from '.';

@Injectable({ providedIn: 'root' })
export class AboutResolve implements Resolve<IAbout> {
    constructor(private service: AboutService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAbout> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: any) => response.ok),
                map((about: any) => about.body)
            );
        }
        return of(new About());
    }
}

export const aboutRoute: Routes = [
    {
        path: '',
        component: AboutViewComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: [],
            defaultSort: 'id,asc',
            pageTitle: 'Team information page'
        }
    },
    {
        path: 'dashboard',
        component: AboutComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Team information management dashboard'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: AboutDetailComponent,
        resolve: {
            about: AboutResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Abouts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: AboutUpdateComponent,
        resolve: {
            about: AboutResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Abouts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: AboutUpdateComponent,
        resolve: {
            about: AboutResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Abouts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const aboutPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: AboutDeletePopupComponent,
        resolve: {
            about: AboutResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Abouts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
