import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import FindLanguageFromKeyPipe from './language/find-language-from-key.pipe';
import TranslateDirective from './language/translate.directive';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { JhiIconComponent } from './icon/icon.component';
import { MaterialModule } from './material/material.module';

/**
 * Application wide Module
 */
@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    TranslateModule,
    AlertComponent,
    AlertErrorComponent,
    FindLanguageFromKeyPipe,
    TranslateDirective,
    JhiIconComponent,
    MaterialModule,
  ],
  exports: [
    CommonModule,
    NgbModule,
    AlertComponent,
    AlertErrorComponent,
    TranslateModule,
    FindLanguageFromKeyPipe,
    TranslateDirective,
    JhiIconComponent,
    MaterialModule,
  ],
})
export default class SharedModule {}
