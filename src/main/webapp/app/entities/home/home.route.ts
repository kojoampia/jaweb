import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Home } from 'app/shared/model/home.model';
import { HomeService } from './home.service';
import { HomeComponent } from './home.component';
import { HomeDetailComponent } from './home-detail.component';
import { HomeUpdateComponent } from './home-update.component';
import { HomeDeletePopupComponent } from './home-delete-dialog.component';
import { IHome } from 'app/shared/model/home.model';

@Injectable({ providedIn: 'root' })
export class HomeResolve implements Resolve<IHome> {
    constructor(private service: HomeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHome> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Home>) => response.ok),
                map((home: HttpResponse<Home>) => home.body)
            );
        }
        return of(new Home());
    }
}

export const homeRoute: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Homes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: HomeDetailComponent,
        resolve: {
            home: HomeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Homes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: HomeUpdateComponent,
        resolve: {
            home: HomeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Homes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: HomeUpdateComponent,
        resolve: {
            home: HomeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Homes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const homePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: HomeDeletePopupComponent,
        resolve: {
            home: HomeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Homes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
