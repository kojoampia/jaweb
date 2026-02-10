import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JojoaddisonSharedModule } from 'app/shared';
import {
    InformationComponent,
    InformationDetailComponent,
    InformationUpdateComponent,
    InformationDeletePopupComponent,
    InformationDeleteDialogComponent,
    informationRoute,
    informationPopupRoute
} from './';
import { InformationViewComponent } from './information-view.component';

const ENTITY_STATES = [...informationRoute, ...informationPopupRoute];

@NgModule({
    imports: [JojoaddisonSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        InformationComponent,
        InformationUpdateComponent,
        InformationDeleteDialogComponent,
        InformationDeletePopupComponent,
        InformationViewComponent
    ],
    entryComponents: [InformationComponent, InformationUpdateComponent, InformationDeleteDialogComponent, InformationDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JojoaddisonInformationModule {}
