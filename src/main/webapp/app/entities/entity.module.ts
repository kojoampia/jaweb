import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JojoaddisonHomeModule } from './home/home.module';
import { JojoaddisonSlideModule } from './slide/slide.module';
import { JojoaddisonInformationModule } from './information/information.module';
import { JojoaddisonServiceModule } from './service/service.module';
import { JojoaddisonPartnerModule } from './partner/partner.module';
import { JojoaddisonPortfolioModule } from './portfolio/portfolio.module';
import { JojoaddisonImprintModule } from './imprint/imprint.module';
import { JojoaddisonContactModule } from './contact/contact.module';
import { JojoaddisonBlogModule } from './blog/blog.module';
import { JojoaddisonAboutModule } from './about/about.module';
import { JojoaddisonSharedCommonModule } from 'app/shared';

@NgModule({
    imports: [
        JojoaddisonSharedCommonModule,
        RouterModule.forChild([
            {
                path: 'home',
                loadChildren: './home/home.module#JojoaddisonHomeModule'
            },
            {
                path: 'blog',
                loadChildren: './blog/blog.module#JojoaddisonBlogModule'
            },
            {
                path: 'information',
                loadChildren: './information/information.module#JojoaddisonInformationModule'
            },
            {
                path: 'slide',
                loadChildren: './slide/slide.module#JojoaddisonSlideModule'
            },
            {
                path: 'service',
                loadChildren: './service/service.module#JojoaddisonServiceModule'
            },
            {
                path: 'portfolio',
                loadChildren: './portfolio/portfolio.module#JojoaddisonPortfolioModule'
            },
            {
                path: 'career',
                loadChildren: './career/career.module#JojoaddisonCareerModule'
            },
            {
                path: 'partner',
                loadChildren: './partner/partner.module#JojoaddisonPartnerModule'
            },
            {
                path: 'about',
                loadChildren: './about/about.module#JojoaddisonAboutModule'
            },
            {
                path: 'contact',
                loadChildren: './contact/contact.module#JojoaddisonContactModule'
            },
            {
                path: 'imprint',
                loadChildren: './imprint/imprint.module#JojoaddisonImprintModule'
            },
            {
                path: 'career',
                loadChildren: './career/career.module#JojoaddisonCareerModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ]),
        JojoaddisonHomeModule,
        JojoaddisonSlideModule,
        JojoaddisonInformationModule,
        JojoaddisonServiceModule,
        JojoaddisonPartnerModule,
        JojoaddisonPortfolioModule,
        JojoaddisonImprintModule,
        JojoaddisonContactModule,
        JojoaddisonBlogModule,
        JojoaddisonAboutModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JojoaddisonEntityModule {}
