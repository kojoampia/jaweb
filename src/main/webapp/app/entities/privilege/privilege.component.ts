import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPrivilege } from 'app/shared/model/privilege.model';
import { AccountService } from 'app/core';
import { PrivilegeService } from './privilege.service';

@Component({
    selector: 'jhi-privilege',
    templateUrl: './privilege.component.html'
})
export class PrivilegeComponent implements OnInit, OnDestroy {
    privileges: IPrivilege[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected privilegeService: PrivilegeService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.privilegeService
            .query()
            .pipe(
                filter((res: HttpResponse<IPrivilege[]>) => res.ok),
                map((res: HttpResponse<IPrivilege[]>) => res.body)
            )
            .subscribe(
                (res: IPrivilege[]) => {
                    this.privileges = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPrivileges();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPrivilege) {
        return item.id;
    }

    registerChangeInPrivileges() {
        this.eventSubscriber = this.eventManager.subscribe('privilegeListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
