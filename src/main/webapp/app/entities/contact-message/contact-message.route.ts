import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ContactMessage } from 'app/shared/model/contact-message.model';
import { ContactMessageService } from './contact-message.service';
import { ContactMessageComponent } from './contact-message.component';
import { ContactMessageDetailComponent } from './contact-message-detail.component';
import { ContactMessageUpdateComponent } from './contact-message-update.component';
import { ContactMessageDeletePopupComponent } from './contact-message-delete-dialog.component';
import { IContactMessage } from 'app/shared/model/contact-message.model';
import { ContactMessageViewComponent } from './contact-message-view.component';

@Injectable({ providedIn: 'root' })
export class ContactMessageResolve implements Resolve<IContactMessage> {
    constructor(private service: ContactMessageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IContactMessage> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ContactMessage>) => response.ok),
                map((contactMessage: HttpResponse<ContactMessage>) => contactMessage.body)
            );
        }
        return of(new ContactMessage());
    }
}

export const contactMessageRoute: Routes = [
    {
        path: '',
        component: ContactMessageViewComponent,
        data: {
            authorities: [],
            pageTitle: 'View Contact Messages'
        }
    },
    {
        path: 'view/:id',
        component: ContactMessageComponent,
        data: {
            authorities: [],
            pageTitle: 'View Contact Messages'
        }
    },
    {
        path: ':id/view',
        component: ContactMessageDetailComponent,
        resolve: {
            contactMessage: ContactMessageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'View Contact Messages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ContactMessageUpdateComponent,
        resolve: {
            contactMessage: ContactMessageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ContactMessages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ContactMessageUpdateComponent,
        resolve: {
            contactMessage: ContactMessageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ContactMessages'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const contactMessagePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ContactMessageDeletePopupComponent,
        resolve: {
            contactMessage: ContactMessageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ContactMessages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
