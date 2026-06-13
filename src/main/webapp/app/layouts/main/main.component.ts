import { Component, OnInit, signal, WritableSignal, inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd, NavigationError, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { StorageService } from 'app/core/services/storage.service';
import { FooterComponent } from 'app/layouts/footer/footer.component';
import { NavbarComponent } from 'app/layouts/navbar/navbar.component';
import PageRibbonComponent from 'app/layouts/profiles/page-ribbon.component';

@Component({
    selector: 'jhi-main',
    standalone: true,
    imports: [CommonModule, RouterModule, FooterComponent, NavbarComponent, PageRibbonComponent],
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    private titleService = inject(Title);
    private router = inject(Router);
    private storageService = inject(StorageService);

    cookieAccepted: WritableSignal<boolean> = signal(false);

    constructor() {
        // Load cookie acceptance from storage
        const stored = this.storageService.getItem<boolean>('cookieAccepted', false);
        if (stored) {
            this.cookieAccepted.set(stored);
        }
    }

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot): string {
        let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'jojoaddisonApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit(): void {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.titleService.setTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
            if (event instanceof NavigationError && event.error.status === 404) {
                this.router.navigate(['/404']);
            }
        });
    }

    acceptCookies(): void {
        this.cookieAccepted.set(true);
        this.storageService.setItem('cookieAccepted', true);
    }
}
