import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JojoaddisonSharedModule } from 'app/shared';
import {
    PortfolioComponent,
    PortfolioDetailComponent,
    PortfolioUpdateComponent,
    PortfolioDeletePopupComponent,
    PortfolioDeleteDialogComponent,
    portfolioRoute,
    portfolioPopupRoute,
    PortfolioViewComponent
} from './';
import { ConsoleLoggerService } from 'app/console-logger.service';

const ENTITY_STATES = [...portfolioRoute, ...portfolioPopupRoute];

@NgModule({
    imports: [JojoaddisonSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PortfolioComponent,
        PortfolioDetailComponent,
        PortfolioUpdateComponent,
        PortfolioDeleteDialogComponent,
        PortfolioDeletePopupComponent,
        PortfolioViewComponent
    ],
    entryComponents: [PortfolioComponent, PortfolioUpdateComponent, PortfolioDeleteDialogComponent, PortfolioDeletePopupComponent],
    providers: [ConsoleLoggerService],
    exports: [PortfolioViewComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JojoaddisonPortfolioModule {}
