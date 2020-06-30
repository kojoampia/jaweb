import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JojoaddisonSharedModule } from 'app/shared';
import {
    SlideViewComponent,
    SlideComponent,
    SlideDetailComponent,
    SlideUpdateComponent,
    SlideDeletePopupComponent,
    SlideDeleteDialogComponent,
    slideRoute,
    slidePopupRoute
} from './';
import { ConsoleLoggerService } from 'app/console-logger.service';

const SLIDE_STATES = [...slideRoute, ...slidePopupRoute];

@NgModule({
    imports: [JojoaddisonSharedModule, RouterModule.forChild(SLIDE_STATES)],
    declarations: [
        SlideComponent,
        SlideViewComponent,
        SlideDetailComponent,
        SlideUpdateComponent,
        SlideDeleteDialogComponent,
        SlideDeletePopupComponent
    ],
    entryComponents: [SlideComponent, SlideViewComponent, SlideUpdateComponent, SlideDeleteDialogComponent, SlideDeletePopupComponent],
    exports: [SlideViewComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JojoaddisonSlideModule {}
