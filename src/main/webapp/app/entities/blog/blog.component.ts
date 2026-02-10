import { Component, OnInit, OnDestroy, signal, inject } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { EventManagerService, ParseLinksService, AlertService, StorageService } from 'app/core/services';

import { IBlog, Blog } from 'app/shared/model/blog.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { BlogService } from './blog.service';

@Component({
    selector: 'jhi-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['../entities.components.scss'],
    standalone: true,
    imports: [CommonModule, RouterModule]
})
export class BlogComponent implements OnInit, OnDestroy {
    // Dependencies
    private blogService = inject(BlogService);
    private parseLinks = inject(ParseLinksService);
    private alertService = inject(AlertService);
    private accountService = inject(AccountService);
    private activatedRoute = inject(ActivatedRoute);
    private router = inject(Router);
    private eventManager = inject(EventManagerService);
    private storageService = inject(StorageService);
    private destroy$ = new Subject<void>();

    // Signals
    currentAccount = signal<any>(null);
    blogs = signal<IBlog[]>([]);
    error = signal<any>(null);
    success = signal<any>(null);
    currentSearch = signal('');
    links = signal<any>({});
    totalItems = signal(0);
    itemsPerPage = ITEMS_PER_PAGE;
    page = signal(1);
    predicate = signal('modifiedDate');
    previousPage = signal(1);
    reverse = signal(false);

    routeData: any;

    loadAll() {
        if (this.currentSearch()) {
            this.blogService
                .search({
                    page: this.page() - 1,
                    query: this.currentSearch(),
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    (res: HttpResponse<IBlog[]>) => this.paginateBlogs(res.body || [], res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.blogService
            .query({
                page: this.page() - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (res: HttpResponse<IBlog[]>) => this.paginateBlogs(res.body || [], res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage()) {
            this.previousPage.set(page);
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/blog'], {
            queryParams: {
                page: this.page(),
                size: this.itemsPerPage,
                search: this.currentSearch(),
                sort: this.predicate() + ',' + (this.reverse() ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page.set(0);
        this.currentSearch.set('');
        this.router.navigate([
            '/blog',
            {
                page: this.page(),
                sort: this.predicate() + ',' + (this.reverse() ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    search(query: any) {
        if (!query) {
            return this.clear();
        }
        this.page.set(0);
        this.currentSearch.set(query);
        this.router.navigate([
            '/blog',
            {
                search: this.currentSearch(),
                page: this.page(),
                sort: this.predicate() + ',' + (this.reverse() ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page.set(data.pagingParams.page);
            this.previousPage.set(data.pagingParams.page);
            this.reverse.set(data.pagingParams.ascending);
            this.predicate.set('modifiedDate');
        });

        const searchParam = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'];
        if (searchParam) {
            this.currentSearch.set(searchParam);
        }

        if (!this.blogs() || this.blogs().length === 0) {
            this.loadAll();
        }

        this.accountService.identity().then((account: any) => {
            this.currentAccount.set(account);
        });

        this.registerChangeInBlogs();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    trackId(index: number, item: IBlog) {
        return item.id;
    }

    registerChangeInBlogs() {
        this.eventManager.subscribe('blogListModification').pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
            console.log(response);
            setTimeout(() => {
                this.blogs.set([]);
                this.predicate.set('modifiedDate');
                this.loadAll();
            }, 1);
        });
    }

    sort() {
        const result = [this.predicate() + ',' + (this.reverse() ? 'asc' : 'desc')];
        if (this.predicate() !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateBlogs(data: IBlog[], headers: HttpHeaders) {
        this.links.set(this.parseLinks.parseLinks(headers.get('link') || ''));
        this.totalItems.set(parseInt(headers.get('X-Total-Count') || '', 10));
        this.blogs.set(data);
    }

    protected onError(errorMessage: string) {
        this.alertService.error(errorMessage);
    }
}
