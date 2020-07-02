import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JojoaddisonSharedModule } from 'app/shared';
import {
    ContactMessageComponent,
    ContactMessageDetailComponent,
    ContactMessageUpdateComponent,
    ContactMessageDeletePopupComponent,
    ContactMessageDeleteDialogComponent,
    contactMessageRoute,
    contactMessagePopupRoute
} from './';

const ENTITY_STATES = [...contactMessageRoute, ...contactMessagePopupRoute];

@NgModule({
    imports: [JojoaddisonSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ContactMessageComponent,
        ContactMessageDetailComponent,
        ContactMessageUpdateComponent,
        ContactMessageDeleteDialogComponent,
        ContactMessageDeletePopupComponent
    ],
    entryComponents: [
        ContactMessageComponent,
        ContactMessageUpdateComponent,
        ContactMessageDeleteDialogComponent,
        ContactMessageDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JojoaddisonContactMessageModule {}
