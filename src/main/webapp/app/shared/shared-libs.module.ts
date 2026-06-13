import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CookieModule } from 'ngx-cookie';
import { JhiIconComponent } from './icon/icon.component';

@NgModule({
    imports: [NgbModule, InfiniteScrollModule, CookieModule.forRoot(), JhiIconComponent],
    exports: [FormsModule, CommonModule, NgbModule, InfiniteScrollModule, JhiIconComponent]
})
export class JojoaddisonSharedLibsModule {
    static forRoot() {
        return {
            ngModule: JojoaddisonSharedLibsModule
        };
    }
}
