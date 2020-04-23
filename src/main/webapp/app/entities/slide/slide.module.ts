import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JojoaddisonSharedModule } from 'app/shared';
import {
    SlideListComponent,
    SlideComponent,
    SlideDetailComponent,
    SlideUpdateComponent,
    SlideDeletePopupComponent,
    SlideDeleteDialogComponent,
    slideRoute,
    slidePopupRoute
} from './';

const SLIDE_STATES = [...slideRoute, ...slidePopupRoute];

@NgModule({
    imports: [JojoaddisonSharedModule, RouterModule.forChild(SLIDE_STATES)],
    declarations: [
        SlideComponent,
        SlideListComponent,
        SlideDetailComponent,
        SlideUpdateComponent,
        SlideDeleteDialogComponent,
        SlideDeletePopupComponent
    ],
    entryComponents: [SlideComponent, SlideListComponent, SlideUpdateComponent, SlideDeleteDialogComponent, SlideDeletePopupComponent],
    exports: [SlideListComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JojoaddisonSlideModule {}
