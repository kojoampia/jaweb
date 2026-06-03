import { NgModule } from '@angular/core';

import { JojoaddisonSharedLibsModule } from './shared-libs.module';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';

@NgModule({
    imports: [JojoaddisonSharedLibsModule, AlertComponent, AlertErrorComponent],
    exports: [JojoaddisonSharedLibsModule, AlertComponent, AlertErrorComponent]
})
export class JojoaddisonSharedCommonModule {}
