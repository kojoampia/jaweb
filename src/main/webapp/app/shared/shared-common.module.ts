import { NgModule } from '@angular/core';

import { JojoaddisonSharedLibsModule, AlertComponent, AlertErrorComponent } from './';

@NgModule({
    imports: [JojoaddisonSharedLibsModule],
    declarations: [AlertComponent, AlertErrorComponent],
    exports: [JojoaddisonSharedLibsModule, AlertComponent, AlertErrorComponent]
})
export class JojoaddisonSharedCommonModule {}
