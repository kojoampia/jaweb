import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JojoaddisonSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { FooterModule } from 'app/layouts/footer/footer.module';
import { WidgetsModule } from 'app/widgets/widgets.module';

@NgModule({
    imports: [JojoaddisonSharedModule, FooterModule, RouterModule.forChild([HOME_ROUTE])],
    declarations: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JojoaddisonHomeModule {}
