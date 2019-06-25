import { NgModule } from '@angular/core';

import { JojoaddisonSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [JojoaddisonSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [JojoaddisonSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class JojoaddisonSharedCommonModule {}
