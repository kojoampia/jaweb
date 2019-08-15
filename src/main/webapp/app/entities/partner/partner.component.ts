import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IPartner } from 'app/shared/model/partner.model';
import { AccountService } from 'app/core';
import { PartnerService } from './partner.service';

@Component({
    selector: 'jhi-partner',
    templateUrl: './partner.component.html'
})
export class PartnerComponent implements OnInit, OnDestroy {
    partners: IPartner[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected partnerService: PartnerService,
        protected jhiAlertService: JhiAlertService,
        protected dataUtils: JhiDataUtils,
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
            this.partnerService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IPartner[]>) => res.ok),
                    map((res: HttpResponse<IPartner[]>) => res.body)
                )
                .subscribe((res: IPartner[]) => (this.partners = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.partnerService
            .query()
            .pipe(
                filter((res: HttpResponse<IPartner[]>) => res.ok),
                map((res: HttpResponse<IPartner[]>) => res.body)
            )
            .subscribe(
                (res: IPartner[]) => {
                    this.partners = res;
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
        this.registerChangeInPartners();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPartner) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInPartners() {
        this.eventSubscriber = this.eventManager.subscribe('partnerListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
