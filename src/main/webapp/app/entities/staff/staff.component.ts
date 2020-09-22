import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IStaff } from 'app/shared/model/staff.model';
import { AccountService } from 'app/core';
import { StaffService } from './staff.service';

@Component({
    selector: 'jhi-staff',
    templateUrl: './staff.component.html'
})
export class StaffComponent implements OnInit, OnDestroy {
    staff: IStaff[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected staffService: StaffService,
        protected jhiAlertService: JhiAlertService,
        protected dataUtils: JhiDataUtils,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.staffService
            .query()
            .pipe(
                filter((res: HttpResponse<IStaff[]>) => res.ok),
                map((res: HttpResponse<IStaff[]>) => res.body)
            )
            .subscribe(
                (res: IStaff[]) => {
                    this.staff = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInStaff();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IStaff) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInStaff() {
        this.eventSubscriber = this.eventManager.subscribe('staffListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
