import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JojoaddisonSharedModule } from 'app/shared';
import {
    ContactComponent,
    ContactDetailComponent,
    ContactUpdateComponent,
    ContactDeletePopupComponent,
    ContactDeleteDialogComponent,
    contactRoute,
    contactPopupRoute
} from './';
import { ContactViewComponent } from './contact-view.component';
import { ConsoleLoggerService } from 'app/console-logger.service';
import { ContactMessageComponent } from './message/contact-message.component';
import { ContactMessageDetailComponent } from './message/contact-message-detail.component';
import { ContactMessageUpdateComponent } from './message/contact-message-update.component';
import { ContactMessageDeleteDialogComponent, ContactMessageDeletePopupComponent } from './message/contact-message-delete-dialog.component';

const ENTITY_STATES = [...contactRoute, ...contactPopupRoute];

@NgModule({
    imports: [JojoaddisonSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ContactComponent,
        ContactDetailComponent,
        ContactUpdateComponent,
        ContactDeleteDialogComponent,
        ContactDeletePopupComponent,
        ContactViewComponent,
        ContactMessageComponent,
        ContactMessageDetailComponent,
        ContactMessageUpdateComponent,
        ContactMessageDeleteDialogComponent,
        ContactMessageDeletePopupComponent
    ],
    entryComponents: [
        ContactComponent,
        ContactUpdateComponent,
        ContactDeleteDialogComponent,
        ContactDeletePopupComponent,
        ContactMessageComponent,
        ContactMessageDetailComponent,
        ContactMessageUpdateComponent,
        ContactMessageDeleteDialogComponent,
        ContactMessageDeletePopupComponent
    ],
    providers: [ConsoleLoggerService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JojoaddisonContactModule {}
