import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VERSION } from 'app/app.constants';
import { AccountService, LoginModalService, LoginService } from 'app/core';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { JhiIconComponent } from 'app/shared/icon/icon.component';

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['navbar.scss'],
    standalone: true,
    imports: [CommonModule, RouterModule, NgbModule, JhiIconComponent]
})
export class NavbarComponent implements OnInit {
    // Dependencies
    private loginService = inject(LoginService);
    private accountService = inject(AccountService);
    private loginModalService = inject(LoginModalService);
    private profileService = inject(ProfileService);
    private router = inject(Router);

    // Signals
    inProduction = signal(false);
    isNavbarCollapsed = signal(true);
    swaggerEnabled = signal(false);
    version = signal(VERSION ? 'v' + VERSION : '');

    ngOnInit() {
        this.profileService.getProfileInfo().subscribe(profileInfo => {
            this.inProduction.set(profileInfo.inProduction ?? false);
            this.swaggerEnabled.set(profileInfo.openAPIEnabled ?? false);
        });
    }

    collapseNavbar() {
        this.isNavbarCollapsed.set(true);
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
        this.isNavbarCollapsed.update(val => !val);
    }

    getImageUrl() {
        return null; // Image URL not available in current account model
    }

    isActive(item: string): boolean {
        if (this.router.url.endsWith(item)) {
            return true;
        }
        return false;
    }
}
