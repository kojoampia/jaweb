import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JojoaddisonSharedModule } from 'app/shared';
import {
    AboutComponent,
    AboutDetailComponent,
    AboutUpdateComponent,
    AboutDeletePopupComponent,
    AboutDeleteDialogComponent,
    aboutRoute,
    aboutPopupRoute
} from './';

const ENTITY_STATES = [...aboutRoute, ...aboutPopupRoute];

@NgModule({
    imports: [JojoaddisonSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [AboutComponent, AboutDetailComponent, AboutUpdateComponent, AboutDeleteDialogComponent, AboutDeletePopupComponent],
    entryComponents: [AboutComponent, AboutUpdateComponent, AboutDeleteDialogComponent, AboutDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JojoaddisonAboutModule {}
