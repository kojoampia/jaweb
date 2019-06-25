import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WidgetsModule } from 'app/widgets/widgets.module';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'slide',
                loadChildren: './slide/slide.module#JojoaddisonSlideModule'
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
                path: 'portfolio',
                loadChildren: './portfolio/portfolio.module#JojoaddisonPortfolioModule'
            },
            {
                path: 'blog',
                loadChildren: './blog/blog.module#JojoaddisonBlogModule'
            },
            {
                path: 'home',
                loadChildren: './home/home.module#JojoaddisonHomeModule'
            },
            {
                path: 'service',
                loadChildren: './service/service.module#JojoaddisonServiceModule'
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
