import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JojoaddisonSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { FooterModule } from 'app/layouts/footer/footer.module';
import { JojoaddisonEntityModule } from 'app/entities/entity.module';

@NgModule({
    imports: [JojoaddisonSharedModule, FooterModule, JojoaddisonEntityModule, RouterModule.forChild([HOME_ROUTE])],
    declarations: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JojoaddisonHomeModule {}
