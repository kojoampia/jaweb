import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JojoaddisonSharedModule } from 'app/shared';
import {
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
        SlideDetailComponent,
        SlideUpdateComponent,
        SlideDeleteDialogComponent,
        SlideDeletePopupComponent
    ],
    entryComponents: [SlideComponent, SlideUpdateComponent, SlideDeleteDialogComponent, SlideDeletePopupComponent],
    providers: [ConsoleLoggerService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JojoaddisonSlideModule {}
