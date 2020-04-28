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
import { JojoaddisonSlideModule } from '../slide/slide.module';
import { WidgetsModule } from 'app/widgets/widgets.module';
import { SlideListComponent } from '../slide';

const IMPRINT_STATES = [...imprintRoute, ...imprintPopupRoute];

@NgModule({
    imports: [JojoaddisonSharedModule, WidgetsModule, RouterModule.forChild(IMPRINT_STATES)],
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
