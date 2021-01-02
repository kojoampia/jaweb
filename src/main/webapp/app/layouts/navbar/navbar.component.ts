import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { VERSION } from 'app/app.constants';
import { AccountService, LoginModalService, LoginService } from 'app/core';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { ScrollSpyService } from 'ngx-scrollspy';
import { fromEvent } from 'rxjs';

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['navbar.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {
    inProduction = false;
    isNavbarCollapsed: boolean;
    languages: any[] = [];
    swaggerEnabled = false;
    version: string;
    showHeader = false;
    constructor(
        private scrollSpyService: ScrollSpyService,
        private loginService: LoginService,
        private accountService: AccountService,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        private router: Router
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
    }

    ngOnInit() {
        this.profileService.getProfileInfo().then(profileInfo => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
        fromEvent(document, 'scroll').subscribe(e => {
            console.log('scroll-event', e);
        });
    }

    ngAfterViewInit() {
        const navEl = this.scrollSpyService.getObservable('navbar');
        console.log('nav-element', navEl);
        if (navEl) {
            console.log('navbar-element', navEl);
            navEl.subscribe((res: any) => {
                console.log('scrollspy', res);
            });
        }
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    login() {
        this.loginModalService.open();
    }

    logout() {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.accountService.getImageUrl() : null;
    }

    isActive(item: string): boolean {
        if (this.router.url.endsWith(item)) {
            return true;
        }
        return false;
    }

    /*
    @HostListener('window:scroll', ['$event'])
    fixNavbar() {
        this.showHeader = true;
        // console.log('scrolling...');
    }
    */

    onScrollDown() {
        this.showHeader = true;
    }

    onScrollUp() {
        this.showHeader = false;
    }
}
