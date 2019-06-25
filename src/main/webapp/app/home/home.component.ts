import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, AccountService, Account } from 'app/core';
import { HomeService } from 'app/entities/home';
import { Home } from 'app/shared/model/home.model';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    currentHome: Home;
    info: any = {
        title: 'A new dawn in software powered economy...',
        content: '...excellence meets creativity.',
        link: '#learn',
        linkText: 'Learn more...'
    };

    constructor(
        private homeService: HomeService,
        private accountService: AccountService,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.accountService.identity().then((account: Account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.accountService.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    loadHome() {
        this.homeService.getCurrent().subscribe(res => {
            this.currentHome = res.body;
            console.log(this.currentHome);
        });
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
