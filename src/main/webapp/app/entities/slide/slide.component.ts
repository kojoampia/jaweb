import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ISlide, Slide } from 'app/shared/model/slide.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { SlideService } from './slide.service';
import { Tile } from 'app/widgets';

@Component({
    selector: 'jhi-slide',
    templateUrl: './slide.component.html',
    styleUrls: ['../entities.components.scss']
})
export class SlideComponent implements OnInit, OnDestroy {
    currentAccount: any;
    slides: ISlide[] = [];
    slide: ISlide = new Slide();
    isEdit = false;
    isView = false;
    isNew = false;
    error: any;
    success: any;
    eventSubscriber: Subscription = new Subscription();
    currentSearch: string;
    routeData: any;
    links: any;
    totalItems = 0;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    tiles: Tile[] = [];
    selectedTiles: ISlide[] = [];

    constructor(
        protected slideService: SlideService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected dataUtils: JhiDataUtils,
        protected router: Router,
        protected eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.slideService
                .search({
                    page: this.page - 1,
                    query: this.currentSearch,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<ISlide[]>) => this.paginateSlides(res.body || [], res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.slideService
            .query()
            .subscribe(
                (res: HttpResponse<ISlide[]>) => this.paginateSlides(res.body || [], res.headers),
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
        this.router.navigate(['/slide'], {
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
            '/slide',
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
            '/slide',
            {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSlides();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISlide) {
        return item.id;
    }

    byteSize(field: any) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType: string, field: any) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInSlides() {
        this.eventSubscriber = this.eventManager.subscribe('slideListModification', (response: any) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateSlides(data: ISlide[], headers: HttpHeaders) {
        console.log(headers);
        const link = headers.get('link');
        console.log(link);
        if (link) {
            this.links = this.parseLinks.parse(link);
        }

        this.totalItems = parseInt(headers.get('X-Total-Count') || '0', 10);
        this.slides = data;
        this.totalItems = data.length;
        this.loadTiles(this.slides);
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, undefined);
    }

    loadTiles(slides: ISlide[]) {
        console.log('loading-tiles...');
        if (slides && slides.length > 0) {
            this.tiles = [];
            slides.forEach(slide => {
                this.tiles.push(new Tile(slide.id || '', slide.title || '', slide.description || '', slide.url || '', false));
            });
        }
    }

    reload() {
        this.slides = [];
        setTimeout(() => {
            this.loadAll();
        }, 1);
    }

    close() {
        delete this.slide;
        this.isEdit = this.isView = this.isNew = false;
    }
    create() {
        this.slide = new Slide();
        this.isNew = true;
        this.isEdit = this.isView = false;
    }
    edit(slide: ISlide) {
        this.slide = slide;
        this.isEdit = true;
        this.isNew = this.isView = false;
    }
    view(slide: ISlide) {
        this.slide = slide;
        this.isView = true;
        this.isEdit = this.isNew = false;
    }
    onSlideSelected(item: any) {
        if (item.selected === true) {
            this.view(item.value);
        }
    }
}
