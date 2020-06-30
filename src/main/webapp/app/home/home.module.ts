import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JojoaddisonSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { FooterModule } from 'app/layouts/footer/footer.module';
import { ConsoleLoggerService } from 'app/console-logger.service';

@NgModule({
    imports: [JojoaddisonSharedModule, FooterModule, RouterModule.forChild([HOME_ROUTE])],
    declarations: [HomeComponent],
    providers: [ConsoleLoggerService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JojoaddisonHomeModule {}
