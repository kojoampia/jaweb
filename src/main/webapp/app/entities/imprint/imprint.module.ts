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
    imprintPopupRoute,
    ImprintListComponent
} from './';

const ENTITY_STATES = [...imprintRoute, ...imprintPopupRoute];

@NgModule({
    imports: [JojoaddisonSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ImprintComponent,
        ImprintDetailComponent,
        ImprintUpdateComponent,
        ImprintDeleteDialogComponent,
        ImprintDeletePopupComponent,
        ImprintListComponent
    ],
    entryComponents: [
        ImprintListComponent,
        ImprintComponent,
        ImprintUpdateComponent,
        ImprintDeleteDialogComponent,
        ImprintDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JojoaddisonImprintModule {}
