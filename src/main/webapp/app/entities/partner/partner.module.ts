import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JojoaddisonSharedModule } from 'app/shared';
import {
    PartnerComponent,
    PartnerDetailComponent,
    PartnerUpdateComponent,
    PartnerDeletePopupComponent,
    PartnerDeleteDialogComponent,
    partnerRoute,
    partnerPopupRoute
} from './';
import { PartnerViewComponent } from './partner-view.component';
import { ConsoleLoggerService } from 'app/console-logger.service';

const ENTITY_STATES = [...partnerRoute, ...partnerPopupRoute];

@NgModule({
    imports: [JojoaddisonSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PartnerComponent,
        PartnerDetailComponent,
        PartnerUpdateComponent,
        PartnerDeleteDialogComponent,
        PartnerDeletePopupComponent,
        PartnerViewComponent
    ],
    entryComponents: [PartnerComponent, PartnerUpdateComponent, PartnerDeleteDialogComponent, PartnerDeletePopupComponent],
    providers: [ConsoleLoggerService],
    exports: [PartnerViewComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JojoaddisonPartnerModule {}
