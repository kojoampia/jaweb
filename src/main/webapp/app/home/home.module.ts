import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JojoaddisonSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { FooterModule } from 'app/layouts/footer/footer.module';
import { JojoaddisonServiceModule } from 'app/entities/service/service.module';
import { JojoaddisonPartnerModule } from 'app/entities/partner/partner.module';
import { JojoaddisonPortfolioModule } from 'app/entities/portfolio/portfolio.module';

@NgModule({
    imports: [JojoaddisonSharedModule, FooterModule, RouterModule.forChild([HOME_ROUTE])],
    declarations: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JojoaddisonHomeModule {}
