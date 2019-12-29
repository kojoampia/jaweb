import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JojoaddisonSharedModule } from 'app/shared';
import {
    ImprintComponent,
    ImprintDetailComponent,
    ImprintUpdateComponent,
    ImprintDeletePopupComponent,
    ImprintDeleteDialogComponent,
    imprintRoute,
    imprintPopupRoute
} from './';

const ENTITY_STATES = [...imprintRoute, ...imprintPopupRoute];

@NgModule({
    imports: [JojoaddisonSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ImprintComponent,
        ImprintDetailComponent,
        ImprintUpdateComponent,
        ImprintDeleteDialogComponent,
        ImprintDeletePopupComponent
    ],
    entryComponents: [ImprintComponent, ImprintUpdateComponent, ImprintDeleteDialogComponent, ImprintDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JojoaddisonImprintModule {}
