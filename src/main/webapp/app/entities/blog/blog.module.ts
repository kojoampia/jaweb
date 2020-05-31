import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JojoaddisonSharedModule } from 'app/shared';
import {
    BlogComponent,
    BlogDetailComponent,
    BlogUpdateComponent,
    BlogDeletePopupComponent,
    BlogDeleteDialogComponent,
    blogRoute,
    blogPopupRoute
} from './';
import { BlogViewComponent } from './blog-view.component';
import { ScrollSpyModule } from 'ngx-scrollspy';

const ENTITY_STATES = [...blogRoute, ...blogPopupRoute];

@NgModule({
    imports: [JojoaddisonSharedModule, ScrollSpyModule.forRoot(), RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BlogComponent,
        BlogDetailComponent,
        BlogUpdateComponent,
        BlogDeleteDialogComponent,
        BlogDeletePopupComponent,
        BlogViewComponent
    ],
    entryComponents: [BlogComponent, BlogUpdateComponent, BlogDeleteDialogComponent, BlogDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JojoaddisonBlogModule {}
