import { Component, OnInit, signal, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RouterModule } from '@angular/router';

import { LoginModalService, AccountService, Account } from 'app/core';
import { HomeService } from 'app/entities/home';
import { Home } from 'app/shared/model/home.model';
import { ISlide } from 'app/shared/model/slide.model';
import { IPortfolio } from 'app/shared/model/portfolio.model';
import { IService } from 'app/shared/model/service.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Partner } from 'app/shared/model/partner.model';
import { Router } from '@angular/router';
import { EventManagerService } from 'app/core/services/event-manager.service';
import { PartnerViewComponent } from 'app/entities/partner/partner-view.component';
import { Infobox, InfoboxComponent } from 'app/widgets/infobox/infobox.component';
import { OwlSliderComponent } from 'app/widgets/owlslider/slider.component';
import { TileboxComponent } from 'app/widgets/tilebox/tilebox.component';

@Component({
    selector: 'jhi-home',
    standalone: true,
    imports: [CommonModule, RouterModule, PartnerViewComponent, InfoboxComponent, OwlSliderComponent, TileboxComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    private homeService = inject(HomeService);
    private accountService = inject(AccountService);
    private loginModalService = inject(LoginModalService);
    private eventManager = inject(EventManagerService);
    private router = inject(Router);
    private domSanitizer = inject(DomSanitizer);
    private modalService = inject(NgbModal);
    private destroy$ = new Subject<void>();

    account = signal<Account | null>(null);
    currentHome = signal<Home | null>(null);
    slides = signal<ISlide[]>([]);
    partners = signal<Partner[]>([]);
    portfolios = signal<IPortfolio[]>([]);
    services = signal<IService[]>([]);
    loaded = signal(false);
    partnerTiles = signal<any[]>([]);

    info: Infobox = new Infobox('home-info', 'Specialists, Implementors, Innovators...', 0, '...we are specialized in implementing perculiar solutions.', '', '#learn', 'Learn more...');

    constructor() {}

    ngOnInit(): void {
        this.accountService.identity()
            .pipe(takeUntil(this.destroy$))
            .subscribe((account: Account | null) => {
                this.account.set(account);
            });
        this.registerAuthenticationSuccess();
        this.loadHome();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    registerAuthenticationSuccess(): void {
        this.eventManager.subscribe('authenticationSuccess', () => {
            this.accountService.identity()
                .pipe(takeUntil(this.destroy$))
                .subscribe((account: Account | null) => {
                    this.account.set(account);
                });
        });
    }

    isAuthenticated(): boolean {
        return this.accountService.isAuthenticated();
    }

    loadHome(): void {
        this.loaded.set(false);
        this.homeService.getCurrent()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: res => {
                    this.currentHome.set(null);
                    this.slides.set([]);
                    this.services.set([]);
                    this.portfolios.set([]);
                    this.partners.set([]);
                    this.partnerTiles.set([]);

                    this.currentHome.set(res.body);
                    if (this.currentHome()) {
                        const information = this.currentHome()!.information;
                        if (information) {
                            this.info = new Infobox(
                                information.id || 'home-info',
                                information.title || '',
                                0,
                                information.content || '',
                                information.brief || '',
                                information.link || '',
                                information.linkText || ''
                            );
                        }
                        this.slides.set(this.currentHome()!.slides || []);
                        this.portfolios.set(this.currentHome()!.portfolios || []);
                        this.services.set(this.currentHome()!.services || []);
                        this.partners.set(this.currentHome()!.partners || []);
                        this.partnerTiles.update(tiles => {
                            this.partners().forEach((item: Partner) => {
                                tiles.push({
                                    id: item.id,
                                    title: item.name,
                                    url: item.logoUrl
                                });
                            });
                            return tiles;
                        });
                    }
                    this.loaded.set(true);
                },
                error: () => {
                    this.loaded.set(true);
                }
            });
    }

    login() {
        this.loginModalService.open();
    }

    safeContent(data: string): SafeHtml {
        return this.domSanitizer.bypassSecurityTrustHtml(data);
    }

    onPartnerSelected(item: any) {
        console.log('partner-selected', item);
        this.router.navigate(['/partner', item.id, 'view']);
    }
}
