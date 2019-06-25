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
import { WidgetsModule } from 'app/widgets/widgets.module';

const ENTITY_STATES = [...slideRoute, ...slidePopupRoute];

@NgModule({
    imports: [JojoaddisonSharedModule, RouterModule.forChild(ENTITY_STATES), WidgetsModule],
    declarations: [SlideComponent, SlideListComponent, SlideDetailComponent, SlideUpdateComponent, SlideDeleteDialogComponent, SlideDeletePopupComponent],
    entryComponents: [SlideComponent, SlideListComponent, SlideUpdateComponent, SlideDeleteDialogComponent, SlideDeletePopupComponent],
    exports: [SlideListComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JojoaddisonSlideModule {}
