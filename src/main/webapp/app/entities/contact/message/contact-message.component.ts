import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IContactMessage } from 'app/shared/model/contact-message.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { ContactService } from '../contact.service';

@Component({
    selector: 'jhi-contact-message',
    templateUrl: './contact-message.component.html',
    styleUrls: ['../../entities.components.scss']
})
export class ContactMessageComponent implements OnInit, OnDestroy {
    contactMessages: IContactMessage[];
    currentAccount: any;
    eventSubscriber: Subscription;
    itemsPerPage: number;
    links: any;
    page: any;
    predicate: any;
    reverse: any;
    totalItems: number;
    currentSearch: string;
    error: any;
    success: any;
    message: any;
    info: any;

    constructor(
        protected contactMessageService: ContactService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected parseLinks: JhiParseLinks,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService
    ) {
        this.contactMessages = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.contactMessageService
                .searchMessage({
                    query: this.currentSearch,
                    page: this.page,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<IContactMessage[]>) => this.paginateContactMessages(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.contactMessageService
            .readMessages({
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IContactMessage[]>) => this.paginateContactMessages(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    reset() {
        this.page = 0;
        this.contactMessages = [];
        this.loadAll();
    }

    loadPage(page: any) {
        this.page = page;
        this.loadAll();
    }

    clear() {
        this.contactMessages = [];
        this.links = {
            last: 0
        };
        this.page = 0;
        this.predicate = 'id';
        this.reverse = true;
        this.currentSearch = '';
        this.loadAll();
    }

    search(query: string) {
        if (!query) {
            return this.clear();
        }
        this.contactMessages = [];
        this.links = {
            last: 0
        };
        this.page = 0;
        this.predicate = '_score';
        this.reverse = false;
        this.currentSearch = query;
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInContactMessages();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IContactMessage) {
        return item.id;
    }

    registerChangeInContactMessages() {
        this.eventSubscriber = this.eventManager.subscribe('contactMessageListModification', response => this.reset());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateContactMessages(data: IContactMessage[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.contactMessages = [];
        setTimeout(() => {
            for (let i = 0; i < data.length; i++) {
                this.contactMessages.push(data[i]);
            }
        }, 1000);
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    setApproved(message: IContactMessage, isApproved: boolean) {
        message.approved = isApproved;
        this.contactMessageService.updateMessage(message).subscribe(response => {
            if (response.status === 200) {
                this.error = null;
                this.success = 'OK';
                this.loadAll();
            } else {
                this.success = null;
                this.error = 'ERROR';
            }
        });
    }

    viewMessage(contactMessage: IContactMessage) {
        this.message = null;
        this.info = null;
        setTimeout(() => {
            this.message = contactMessage;
            this.info = {
                title: contactMessage.title,
                brief: contactMessage.message,
                content: contactMessage.message
            };
        }, 500);
    }

    close() {
        this.message = null;
    }
}
