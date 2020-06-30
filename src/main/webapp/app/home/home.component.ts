import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, AccountService, Account } from 'app/core';
import { HomeService } from 'app/entities/home';
import { Home } from 'app/shared/model/home.model';
import { ISlide } from 'app/shared/model/slide.model';
import { LocalStorage } from 'ngx-webstorage';
import { IPortfolio } from 'app/shared/model/portfolio.model';
import { IService } from 'app/shared/model/service.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    currentHome: Home;
    slides: ISlide[];
    partners: any[];
    portfolios: IPortfolio[];
    services: IService[];
    loaded = false;

    info: any = {
        title: 'Specialists, Implementors, Innovators...',
        content: '...we are specialized in implementing perculiar solutions.',
        link: '#learn',
        linkText: 'Learn more...'
    };

    constructor(
        private homeService: HomeService,
        private accountService: AccountService,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private domSanitizer: DomSanitizer
    ) {}

    ngOnInit() {
        this.accountService.identity().then((account: Account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        this.loadHome();
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
        this.loaded = false;
        this.homeService.getCurrent().subscribe(res => {
            this.currentHome = null;
            this.slides = null;
            this.services = null;
            this.portfolios = null;
            this.partners = null;

            setTimeout(() => {
                this.currentHome = res.body;
                console.log(this.currentHome);
                if (this.currentHome) {
                    this.info = this.currentHome.information;
                    this.slides = this.currentHome.slides;
                    this.portfolios = this.currentHome.portfolios;
                    this.services = this.currentHome.services;
                }
                this.loaded = true;
            }, 20);
        });
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    safeContent(data: string): SafeHtml {
        return this.domSanitizer.bypassSecurityTrustHtml(data);
    }
}
