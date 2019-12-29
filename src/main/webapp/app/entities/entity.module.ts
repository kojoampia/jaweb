import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'about',
                loadChildren: './about/about.module#JojoaddisonAboutModule'
            },
            {
                path: 'slide',
                loadChildren: './slide/slide.module#JojoaddisonSlideModule'
            },
            {
                path: 'contact',
                loadChildren: './contact/contact.module#JojoaddisonContactModule'
            },
            {
                path: 'home',
                loadChildren: './home/home.module#JojoaddisonHomeModule'
            },
            {
                path: 'imprint',
                loadChildren: './imprint/imprint.module#JojoaddisonImprintModule'
            },
            {
                path: 'blog',
                loadChildren: './blog/blog.module#JojoaddisonBlogModule'
            },
            {
                path: 'partner',
                loadChildren: './partner/partner.module#JojoaddisonPartnerModule'
            },
            {
                path: 'portfolio',
                loadChildren: './portfolio/portfolio.module#JojoaddisonPortfolioModule'
            },
            {
                path: 'product',
                loadChildren: './product/product.module#JojoaddisonProductModule'
            },
            {
                path: 'service',
                loadChildren: './service/service.module#JojoaddisonServiceModule'
            },
            {
                path: 'information',
                loadChildren: './information/information.module#JojoaddisonInformationModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JojoaddisonEntityModule {}
