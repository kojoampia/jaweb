import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IInformation } from 'app/shared/model/information.model';
import { AccountService } from 'app/core';
import { InformationService } from './information.service';

@Component({
    selector: 'jhi-information',
    templateUrl: './information.component.html'
})
export class InformationComponent implements OnInit, OnDestroy {
    information: IInformation[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
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

    loadAll() {
        if (this.currentSearch) {
            this.informationService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IInformation[]>) => res.ok),
                    map((res: HttpResponse<IInformation[]>) => res.body)
                )
                .subscribe((res: IInformation[]) => (this.information = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.informationService
            .query()
            .pipe(
                filter((res: HttpResponse<IInformation[]>) => res.ok),
                map((res: HttpResponse<IInformation[]>) => res.body)
            )
            .subscribe(
                (res: IInformation[]) => {
                    this.information = res;
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
        this.registerChangeInInformation();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IInformation) {
        return item.id;
    }

    registerChangeInInformation() {
        this.eventSubscriber = this.eventManager.subscribe('informationListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
