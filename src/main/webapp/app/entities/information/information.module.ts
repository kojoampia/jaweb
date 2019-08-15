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

const ENTITY_STATES = [...informationRoute, ...informationPopupRoute];

@NgModule({
    imports: [JojoaddisonSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        InformationComponent,
        InformationDetailComponent,
        InformationUpdateComponent,
        InformationDeleteDialogComponent,
        InformationDeletePopupComponent
    ],
    entryComponents: [InformationComponent, InformationUpdateComponent, InformationDeleteDialogComponent, InformationDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JojoaddisonInformationModule {}
