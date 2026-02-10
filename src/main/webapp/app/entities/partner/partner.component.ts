import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { EventManager } from 'app/core/services/event-manager.service';
import { AlertService } from 'app/core/services/alert.service';

import { IPartner } from 'app/shared/model/partner.model';
import { AccountService } from 'app/core';
import { PartnerService } from './partner.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AlertComponent } from 'app/shared/alert/alert.component';

@Component({
    selector: 'jhi-partner',
    templateUrl: './partner.component.html',
    standalone: true,
    imports: [CommonModule, FontAwesomeModule, RouterModule, AlertComponent]
})
export class PartnerComponent implements OnInit, OnDestroy {
    partners: IPartner[] = [];
    currentAccount: any = null;
    eventSubscriber: Subscription | null = null;
    currentSearch: string;

    constructor(
        protected partnerService: PartnerService,
        protected alertService: AlertService,
        // protected dataUtils: JhiDataUtils,
        protected eventManager: EventManager,
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
                .subscribe((res: IPartner[] | null) => (this.partners = res || []), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.partnerService
            .query()
            .pipe(
                filter((res: HttpResponse<IPartner[]>) => res.ok),
                map((res: HttpResponse<IPartner[]>) => res.body)
            )
            .subscribe(
                (res: IPartner[] | null) => {
                    this.partners = res || [];
                    this.currentSearch = '';
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    search(query: string) {
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
        this.accountService.identity().pipe(
            tap(account => {
                this.currentAccount = account;
            })
        ).subscribe();
        this.registerChangeInPartners();
    }

    ngOnDestroy() {
        if (this.eventSubscriber) {
            this.eventSubscriber.unsubscribe();
            this.eventSubscriber = null; // Set to null after unsubscribing
        }
    }

    trackId(index: number, item: IPartner): string | number | undefined {
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

    registerChangeInPartners() {
        this.eventSubscriber = this.eventManager.subscribe('partnerListModification', (response: any) => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.alertService.addAlert({ type: 'danger', message: errorMessage });
    }
}
