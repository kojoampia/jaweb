import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { EventManager } from 'app/core/services/event-manager.service';
import { AlertService } from 'app/core/services/alert.service'; // Assuming this is the replacement for JhiAlertService

import { IPortfolio } from 'app/shared/model/portfolio.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { PortfolioService } from './portfolio.service';
import { CommonModule, DatePipe } from '@angular/common'; // For *ngIf, *ngFor, DatePipe
import { SortDirective, SortByDirective } from 'app/shared/sort';
import ItemCountComponent from 'app/shared/pagination/item-count.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // For fa-icon
// import { JhiItemCountComponent } from 'app/shared/pagination'; // Assuming this is the component

import { AlertComponent } from 'app/shared/alert/alert.component'; // Assuming this is the JhiAlert replacement

@Component({
    selector: 'jhi-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['../entities.components.scss'],
    standalone: true,
    imports: [CommonModule, FontAwesomeModule, RouterModule, AlertComponent, DatePipe, SortDirective, SortByDirective, ItemCountComponent] // Added CommonModule, FontAwesomeModule, RouterModule, AlertComponent
})
export class PortfolioComponent implements OnInit, OnDestroy {
    currentAccount: any = null;
    portfolios: IPortfolio[] = [];
    error: any;
    success: any;
    eventSubscriber: Subscription | null = null;
    currentSearch: string;
    routeData: Subscription | null = null; // Changed to Subscription
    links: any;
    totalItems: number = 0; // Initialized to 0
    itemsPerPage: number = ITEMS_PER_PAGE;
    page: number = 0; // Initialized to 0
    predicate: string = 'id'; // Initialized to 'id'
    previousPage: number = 0; // Initialized to 0
    reverse: boolean = true; // Initialized to true

    constructor(
        protected portfolioService: PortfolioService,
        // protected parseLinks: JhiParseLinks, // Deprecated
        protected alertService: AlertService, // Changed from JhiAlertService
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        // protected dataUtils: JhiDataUtils, // Deprecated
        protected router: Router,
        protected eventManager: EventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.currentSearch = '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.portfolioService
                .search({
                    page: this.page - 1,
                    query: this.currentSearch,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .pipe(
                    filter((res: HttpResponse<IPortfolio[]>) => res.ok),
                    map((res: HttpResponse<IPortfolio[]>) => res.body)
                )
                .subscribe(
                    (res: IPortfolio[] | null) => this.paginatePortfolios(res || [], new HttpHeaders()), // Pass an empty array if null
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.portfolioService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .pipe(
                filter((res: HttpResponse<IPortfolio[]>) => res.ok),
                map((res: HttpResponse<IPortfolio[]>) => res.body)
            )
            .subscribe(
                (res: IPortfolio[] | null) => this.paginatePortfolios(res || [], new HttpHeaders()), // Pass an empty array if null
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/portfolio'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                search: this.currentSearch,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate([
            '/portfolio',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    search(query: string) {
        if (!query) {
            return this.clear();
        }
        this.page = 0;
        this.currentSearch = query;
        this.router.navigate([
            '/portfolio',
            {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.activatedRoute.queryParamMap.subscribe(params => {
            this.page = parseInt(params.get('page') || '1', 10);
            this.previousPage = this.page;
            this.itemsPerPage = parseInt(params.get('size') || ITEMS_PER_PAGE.toString(), 10);
            this.currentSearch = params.get('search') || '';
            const sort = (params.get('sort') || this.predicate + ',' + (this.reverse ? 'asc' : 'desc')).split(',');
            this.predicate = sort[0];
            this.reverse = sort[1] === 'asc';
            this.loadAll();
        });
        this.accountService.identity().pipe(
            tap(account => {
                this.currentAccount = account;
            })
        ).subscribe();
        this.registerChangeInPortfolios();
    }

    ngOnDestroy() {
        if (this.eventSubscriber) {
            this.eventSubscriber.unsubscribe();
            this.eventSubscriber = null; // Set to null after unsubscribing
        }
        // routeData is no longer a Subscription, so no need to unsubscribe
    }

    trackId(index: number, item: IPortfolio): string | number | undefined {
        return item.id;
    }

    byteSize(field: any): any {
        // return this.dataUtils.byteSize(field);
        return field;
    }

    openFile(contentType: any, field: any): any {
        // return this.dataUtils.openFile(contentType, field);
        return field;
    }

    registerChangeInPortfolios() {
        this.eventSubscriber = this.eventManager.subscribe('portfolioListModification', (response: any) => this.loadAll());
    }

    sort(): string[] {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginatePortfolios(data: IPortfolio[], headers: HttpHeaders) {
        // this.links = this.parseLinks.parse(headers.get('link')); // parseLinks is deprecated
        this.totalItems = parseInt(headers.get('X-Total-Count') || '0', 10); // Safely parse and provide default
        this.portfolios = data;
    }

    protected onError(errorMessage: string) {
        this.alertService.addAlert({ type: 'danger', message: errorMessage });
    }
}
