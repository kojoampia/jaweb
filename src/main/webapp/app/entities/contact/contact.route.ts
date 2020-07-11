import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Contact } from 'app/shared/model/contact.model';
import { ContactService } from './contact.service';
import { ContactComponent } from './contact.component';
import { ContactDetailComponent } from './contact-detail.component';
import { ContactUpdateComponent } from './contact-update.component';
import { IContact } from 'app/shared/model/contact.model';
import {
    ContactViewComponent,
    ContactDeletePopupComponent,
    ContactMessageComponent,
    ContactMessageUpdateComponent,
    ContactMessageDetailComponent,
    ContactMessageDeletePopupComponent
} from '.';

@Injectable({ providedIn: 'root' })
export class ContactResolve implements Resolve<IContact> {
    constructor(private service: ContactService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IContact> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: any) => response.ok),
                map((contact: any) => contact.body)
            );
        }
        return of(new Contact());
    }
}

export const contactRoute: Routes = [
    {
        path: '',
        component: ContactViewComponent,
        data: {
            authorities: [],
            pageTitle: 'The many avenues for contacting us'
        }
    },
    {
        path: 'dashboard',
        component: ContactComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Contact us management dashboard'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ContactDetailComponent,
        resolve: {
            contact: ContactResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Contacts'
        }
    },
    {
        path: 'new',
        component: ContactUpdateComponent,
        resolve: {
            contact: ContactResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Contacts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ContactUpdateComponent,
        resolve: {
            contact: ContactResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Contacts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'messages',
        component: ContactMessageComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Contact messaging dashboard'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'messages/:id/reply',
        component: ContactMessageUpdateComponent,
        resolve: {
            contact: ContactResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Reply Message'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'messages/:id/view',
        component: ContactMessageDetailComponent,
        resolve: {
            contact: ContactResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'View Message'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const contactPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ContactDeletePopupComponent,
        resolve: {
            contact: ContactResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Contacts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'messages/:id/delete',
        component: ContactMessageDeletePopupComponent,
        resolve: {
            contact: ContactResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Contacts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
