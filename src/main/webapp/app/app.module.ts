import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { JojoaddisonCoreModule } from 'app/core';
import { JojoaddisonAppRoutingModule } from './app-routing.module';
import { JojoaddisonHomeModule } from './home/home.module';
import { JojoaddisonAccountModule } from './account/account.module';
import { JojoaddisonEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent, NavbarComponent } from './layouts';
import { FooterModule } from './layouts/footer/footer.module';
import { ConsoleLoggerService } from './console-logger.service';
import dayjs from 'dayjs';

@NgModule({
    imports: [
        BrowserModule,
        JojoaddisonCoreModule,
        JojoaddisonHomeModule,
        JojoaddisonAccountModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
        JojoaddisonEntityModule,
        JojoaddisonAppRoutingModule,
        FooterModule
    ],
    declarations: [MainComponent, NavbarComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true
        },
        ConsoleLoggerService
    ],
    bootstrap: [MainComponent]
})
export class JojoaddisonAppModule {
    constructor(private dpConfig: NgbDatepickerConfig) {
        this.dpConfig.minDate = { year: dayjs().year() - 100, month: 1, day: 1 };
    }
}
