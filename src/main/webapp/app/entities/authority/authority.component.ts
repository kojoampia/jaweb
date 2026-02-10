import { Component, OnInit, OnDestroy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, filter, map } from 'rxjs/operators';
import { EventManagerService, AlertService } from 'app/core/services';

import { IAuthority } from 'app/shared/model/authority.model';
import { AccountService } from 'app/core';
import { AuthorityService } from './authority.service';

@Component({
    selector: 'jhi-authority',
    templateUrl: './authority.component.html'
})
export class AuthorityComponent implements OnInit, OnDestroy {
    authorities: IAuthority[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected authorityService: AuthorityService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.authorityService
            .query()
            .pipe(
                filter((res: HttpResponse<IAuthority[]>) => res.ok),
                map((res: HttpResponse<IAuthority[]>) => res.body)
            )
            .subscribe(
                (res: IAuthority[]) => {
                    this.authorities = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAuthorities();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAuthority) {
        return item.id;
    }

    registerChangeInAuthorities() {
        this.eventSubscriber = this.eventManager.subscribe('authorityListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
