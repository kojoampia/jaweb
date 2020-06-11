import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICareer } from 'app/shared/model/career.model';
import { AccountService } from 'app/core';
import { CareerService } from './career.service';

@Component({
    selector: 'jhi-career',
    templateUrl: './career.component.html',
    styleUrls: ['../entities.components.scss']
})
export class CareerComponent implements OnInit, OnDestroy {
    careers: ICareer[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected careerService: CareerService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.careerService
            .query()
            .pipe(
                filter((res: HttpResponse<ICareer[]>) => res.ok),
                map((res: HttpResponse<ICareer[]>) => res.body)
            )
            .subscribe(
                (res: ICareer[]) => {
                    this.careers = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCareers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICareer) {
        return item.id;
    }

    registerChangeInCareers() {
        this.eventSubscriber = this.eventManager.subscribe('careerListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
