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
import { JojoaddisonSlideModule } from '../slide/slide.module';

const ENTITY_STATES = [...homeRoute, ...homePopupRoute];

@NgModule({
    imports: [JojoaddisonSharedModule, RouterModule.forChild(ENTITY_STATES), JojoaddisonSlideModule],
    declarations: [HomeComponent, HomeDetailComponent, HomeUpdateComponent, HomeDeleteDialogComponent, HomeDeletePopupComponent],
    entryComponents: [HomeComponent, HomeUpdateComponent, HomeDeleteDialogComponent, HomeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JojoaddisonHomeModule {}
