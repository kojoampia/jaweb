import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JojoaddisonSharedModule } from 'app/shared';
import {
    AuthorityComponent,
    AuthorityDetailComponent,
    AuthorityUpdateComponent,
    AuthorityDeletePopupComponent,
    AuthorityDeleteDialogComponent,
    authorityRoute,
    authorityPopupRoute
} from './';

const ENTITY_STATES = [...authorityRoute, ...authorityPopupRoute];

@NgModule({
    imports: [JojoaddisonSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AuthorityComponent,
        AuthorityDetailComponent,
        AuthorityUpdateComponent,
        AuthorityDeleteDialogComponent,
        AuthorityDeletePopupComponent
    ],
    entryComponents: [AuthorityComponent, AuthorityUpdateComponent, AuthorityDeleteDialogComponent, AuthorityDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JojoaddisonAuthorityModule {}
