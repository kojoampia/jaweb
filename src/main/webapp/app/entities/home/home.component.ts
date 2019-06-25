import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHome, Home } from 'app/shared/model/home.model';
import { AccountService } from 'app/core';
import { HomeService } from './home.service';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['../entities.components.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    homes: IHome[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    home: IHome;
    isView: boolean;
    isEdit: boolean;
    isNew: boolean;

    constructor(
        protected homeService: HomeService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.homeService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IHome[]>) => res.ok),
                    map((res: HttpResponse<IHome[]>) => res.body)
                )
                .subscribe((res: IHome[]) => (this.homes = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.homeService
            .query()
            .pipe(
                filter((res: HttpResponse<IHome[]>) => res.ok),
                map((res: HttpResponse<IHome[]>) => res.body)
            )
            .subscribe(
                (res: IHome[]) => {
                    this.homes = res;
                    this.currentSearch = '';
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInHomes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IHome) {
        return item.id;
    }

    registerChangeInHomes() {
        this.eventSubscriber = this.eventManager.subscribe('homeListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    create() {
        this.home = new Home();
        this.isNew = true;
        this.isEdit = this.isView = false;
    }

    view(home: IHome) {
        this.home = home;
        this.isView = true;
        this.isEdit = this.isNew = false;
    }

    edit(home: IHome) {
        this.home = home;
        this.isEdit =  true;
        this.isView = this.isNew = false;
    }

    close(event: any) {
        this.home = null;
        this.isEdit = this.isView = this.isNew = false;
    }
}
