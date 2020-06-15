import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Career } from 'app/shared/model/career.model';
import { CareerService } from './career.service';
import { CareerComponent } from './career.component';
import { CareerDetailComponent } from './career-detail.component';
import { CareerUpdateComponent } from './career-update.component';
import { CareerDeletePopupComponent } from './career-delete-dialog.component';
import { ICareer } from 'app/shared/model/career.model';
import { CareerViewComponent } from '.';

@Injectable({ providedIn: 'root' })
export class CareerResolve implements Resolve<ICareer> {
    constructor(private service: CareerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICareer> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Career>) => response.ok),
                map((career: HttpResponse<Career>) => career.body)
            );
        }
        return of(new Career());
    }
}

export const careerRoute: Routes = [
    {
        path: '',
        component: CareerViewComponent,
        data: {
            authorities: [],
            pageTitle: 'Careers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dashboard',
        component: CareerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Careers Dashboard'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'view/:id',
        component: CareerDetailComponent,
        resolve: {
            career: CareerResolve
        },
        data: {
            authorities: [],
            pageTitle: 'Career Detail'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: CareerDetailComponent,
        resolve: {
            career: CareerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Careers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: CareerUpdateComponent,
        resolve: {
            career: CareerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Careers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: CareerUpdateComponent,
        resolve: {
            career: CareerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Careers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const careerPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: CareerDeletePopupComponent,
        resolve: {
            career: CareerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Careers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
