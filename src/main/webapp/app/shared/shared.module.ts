import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { JojoaddisonSharedLibsModule, JojoaddisonSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';
import { WidgetsModule } from 'app/widgets/widgets.module';

@NgModule({
    imports: [JojoaddisonSharedLibsModule, JojoaddisonSharedCommonModule, WidgetsModule],
    declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [JhiLoginModalComponent],
    exports: [JojoaddisonSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective, WidgetsModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JojoaddisonSharedModule {
    static forRoot() {
        return {
            ngModule: JojoaddisonSharedModule
        };
    }
}
