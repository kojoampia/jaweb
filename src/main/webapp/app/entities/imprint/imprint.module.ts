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
    ImprintViewComponent
} from './';
import { WidgetsModule } from 'app/widgets/widgets.module';
import { ConsoleLoggerService } from 'app/console-logger.service';

const IMPRINT_STATES = [...imprintRoute, ...imprintPopupRoute];

@NgModule({
    imports: [JojoaddisonSharedModule, WidgetsModule, RouterModule.forChild(IMPRINT_STATES)],
    declarations: [
        ImprintComponent,
        ImprintDetailComponent,
        ImprintUpdateComponent,
        ImprintDeleteDialogComponent,
        ImprintDeletePopupComponent,
        ImprintViewComponent
    ],
    entryComponents: [ImprintComponent, ImprintUpdateComponent, ImprintDeleteDialogComponent, ImprintDeletePopupComponent],
    providers: [ConsoleLoggerService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JojoaddisonImprintModule {}
