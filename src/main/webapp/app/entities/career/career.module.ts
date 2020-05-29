import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JojoaddisonSharedModule } from 'app/shared';
import {
    CareerComponent,
    CareerDetailComponent,
    CareerUpdateComponent,
    CareerDeletePopupComponent,
    CareerDeleteDialogComponent,
    careerRoute,
    careerPopupRoute
} from './';
import { CareerViewComponent } from './career-view.component';

const ENTITY_STATES = [...careerRoute, ...careerPopupRoute];

@NgModule({
    imports: [JojoaddisonSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CareerComponent,
        CareerDetailComponent,
        CareerUpdateComponent,
        CareerDeleteDialogComponent,
        CareerDeletePopupComponent,
        CareerViewComponent
    ],
    entryComponents: [CareerComponent, CareerUpdateComponent, CareerDeleteDialogComponent, CareerDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JojoaddisonCareerModule {}
