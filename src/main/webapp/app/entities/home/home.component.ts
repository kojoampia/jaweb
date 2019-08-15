import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHome } from 'app/shared/model/home.model';
import { AccountService } from 'app/core';
import { HomeService } from './home.service';
import { IInformation } from 'app/shared/model/information.model';
import { InformationService } from '../information';

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
    info: IInformation;

    constructor(
        protected homeService: HomeService,
        protected informationService: InformationService,
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

    loadInformation() {
        this.informationService.query().subscribe(res => {
            console.log(res);
            if (res.body && res.body.length > 0) {
                this.info = res.body[0];
                console.log('info');
                console.log(this.info);
            }
        });
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
}
