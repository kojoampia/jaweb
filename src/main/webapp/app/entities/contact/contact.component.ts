import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IContact } from 'app/shared/model/contact.model';
import { AccountService } from 'app/core';
import { ContactService } from './contact.service';

@Component({
    selector: 'jhi-contact',
    templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit, OnDestroy {
    contacts: IContact[] = [];
    currentAccount: any;
    eventSubscriber: Subscription = new Subscription();
    currentSearch: string;

    constructor(
        protected contactService: ContactService,
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
            this.contactService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IContact[]>) => res.ok),
                    map((res: HttpResponse<IContact[]>) => res.body)
                )
                .subscribe((res: IContact[] | null) => (this.contacts = res || []), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.contactService
            .query()
            .pipe(
                filter((res: HttpResponse<IContact[]>) => res.ok),
                map((res: HttpResponse<IContact[]>) => res.body)
            )
            .subscribe(
                (res: IContact[] | null) => {
                    this.contacts = res || [];
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
        this.accountService.identity().then((account: any) => {
            this.currentAccount = account;
        });
        this.registerChangeInContacts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IContact) {
        return item.id;
    }

    byteSize(field: any) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType: string, field: any) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInContacts() {
        this.eventSubscriber = this.eventManager.subscribe('contactListModification', (response: any) => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, undefined);
    }
}
