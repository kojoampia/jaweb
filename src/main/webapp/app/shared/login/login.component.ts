import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { LoginService } from 'app/core/login/login.service';
import { StateStorageService } from 'app/core/auth/state-storage.service';
import { EventManagerService } from 'app/core/services';

@Component({
    selector: 'jhi-login-modal',
    templateUrl: './login.component.html',
    standalone: true,
    imports: [CommonModule, FormsModule]
})
export class JhiLoginModalComponent implements AfterViewInit {
    @ViewChild('username') usernameField?: ElementRef;
    
    authenticationError = false;
    password = '';
    rememberMe = false;
    username = '';
    credentials: any = {};

    constructor(
        private eventManager: EventManagerService,
        private loginService: LoginService,
        private stateStorageService: StateStorageService,
        private elementRef: ElementRef,
        private router: Router,
        public activeModal: NgbActiveModal
    ) {
        this.credentials = {};
    }

    ngAfterViewInit() {
        if (this.usernameField) {
            this.usernameField.nativeElement.focus();
        }
    }

    cancel() {
        this.credentials = {
            username: null,
            password: null,
            rememberMe: true
        };
        this.authenticationError = false;
        this.activeModal.dismiss('cancel');
    }

    login() {
        this.loginService
            .login({
                username: this.username,
                password: this.password,
                rememberMe: this.rememberMe
            })
            .subscribe({
                next: () => {
                    this.authenticationError = false;
                    this.activeModal.dismiss('login success');
                    if (this.router.url === '/register' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
                        this.router.navigate(['']);
                    }

                    this.eventManager.broadcast({
                        name: 'authenticationSuccess',
                        content: 'Sending Authentication Success'
                    });

                    // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                    // since login is successful, go to stored previousState and clear previousState
                    const redirect = this.stateStorageService.getUrl();
                    if (redirect) {
                        this.stateStorageService.storeUrl('');
                        this.router.navigate([redirect]);
                    }
                },
                error: () => {
                    this.authenticationError = true;
                }
            });
    }

    register() {
        this.activeModal.dismiss('to state register');
        this.router.navigate(['/register']);
    }

    requestResetPassword() {
        this.activeModal.dismiss('to state requestReset');
        this.router.navigate(['/reset', 'request']);
    }
}
