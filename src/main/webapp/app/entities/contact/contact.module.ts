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
import { JojoaddisonContactMessageModule } from '../contact-message/contact-message.module';

const ENTITY_STATES = [...contactRoute, ...contactPopupRoute];

@NgModule({
    imports: [JojoaddisonSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ContactComponent,
        ContactDetailComponent,
        ContactUpdateComponent,
        ContactDeleteDialogComponent,
        ContactDeletePopupComponent,
        ContactViewComponent
    ],
    entryComponents: [ContactComponent, ContactUpdateComponent, ContactDeleteDialogComponent, ContactDeletePopupComponent],
    providers: [ConsoleLoggerService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JojoaddisonContactModule {}
