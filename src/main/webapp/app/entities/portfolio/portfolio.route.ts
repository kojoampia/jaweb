import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Portfolio } from 'app/shared/model/portfolio.model';
import { PortfolioService } from './portfolio.service';
import { PortfolioComponent } from './portfolio.component';
import { PortfolioDetailComponent } from './portfolio-detail.component';
import { PortfolioUpdateComponent } from './portfolio-update.component';
import { PortfolioDeletePopupComponent } from './portfolio-delete-dialog.component';
import { IPortfolio } from 'app/shared/model/portfolio.model';
import { PortfolioViewComponent } from '.';

@Injectable({ providedIn: 'root' })
export class PortfolioResolve implements Resolve<IPortfolio> {
    constructor(private service: PortfolioService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPortfolio> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: any) => response.ok),
                map((portfolio: any) => portfolio.body)
            );
        }
        return of(new Portfolio());
    }
}

export const portfolioRoute: Routes = [
    {
        path: '',
        component: PortfolioViewComponent,
        data: {
            authorities: [],
            defaultSort: 'id,asc',
            pageTitle: 'Portfolios'
        }
    },
    {
        path: 'dashboard',
        component: PortfolioComponent,
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Portfolios'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'view/:id',
        component: PortfolioDetailComponent,
        resolve: {
            portfolio: PortfolioResolve
        },
        data: {
            authorities: [],
            pageTitle: 'Portfolios'
        }
    },
    {
        path: ':id/view',
        component: PortfolioDetailComponent,
        resolve: {
            portfolio: PortfolioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Portfolios'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PortfolioUpdateComponent,
        resolve: {
            portfolio: PortfolioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Portfolios'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PortfolioUpdateComponent,
        resolve: {
            portfolio: PortfolioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Portfolios'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const portfolioPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PortfolioDeletePopupComponent,
        resolve: {
            portfolio: PortfolioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Portfolios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
