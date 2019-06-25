import { NgModule } from '@angular/core';
import { FooterComponent } from './footer.component';
import { JojoaddisonSharedModule } from 'app/shared';

@NgModule({
    imports: [JojoaddisonSharedModule],
    declarations: [FooterComponent],
    exports: [FooterComponent]
})
export class FooterModule {}
