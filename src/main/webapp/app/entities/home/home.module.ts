import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JojoaddisonSharedModule } from 'app/shared';
import {
    HomeComponent,
    HomeDetailComponent,
    HomeUpdateComponent,
    HomeDeletePopupComponent,
    HomeDeleteDialogComponent,
    homeRoute,
    homePopupRoute
} from './';
import { ConsoleLoggerService } from 'app/console-logger.service';

const ENTITY_STATES = [...homeRoute, ...homePopupRoute];

@NgModule({
    imports: [JojoaddisonSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [HomeComponent, HomeDetailComponent, HomeUpdateComponent, HomeDeleteDialogComponent, HomeDeletePopupComponent],
    entryComponents: [HomeComponent, HomeUpdateComponent, HomeDeleteDialogComponent, HomeDeletePopupComponent],
    providers: [ConsoleLoggerService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JojoaddisonHomeModule {}
