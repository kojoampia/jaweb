import { Component, OnInit, OnDestroy, signal, inject } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ICareer } from 'app/shared/model/career.model';
import { AccountService } from 'app/core';
import { CareerService } from './career.service';
import { EventManagerService, AlertService } from 'app/core/services';

@Component({
    selector: 'jhi-career',
    templateUrl: './career.component.html',
    styleUrls: ['../entities.components.scss'],
    standalone: true,
    imports: [CommonModule, RouterModule]
})
export class CareerComponent implements OnInit, OnDestroy {
    private careerService = inject(CareerService);
    private alertService = inject(AlertService);
    private eventManager = inject(EventManagerService);
    private accountService = inject(AccountService);
    private destroy$ = new Subject<void>();
    
    careers = signal<ICareer[]>([]);
    currentAccount = signal<any>(null);
    eventSubscriber: Subscription;

    loadAll() {
        this.careerService
            .query()
            .pipe(
                filter((res: HttpResponse<ICareer[]>) => res.ok),
                map((res: HttpResponse<ICareer[]>) => res.body),
                takeUntil(this.destroy$)
            )
            .subscribe({
                next: (res: ICareer[]) => {
                    this.careers.set(res);
                },
                error: (res: HttpErrorResponse) => this.onError(res.message)
            });
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount.set(account);
        });
        this.registerChangeInCareers();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICareer) {
        return item.id;
    }

    registerChangeInCareers() {
        this.eventSubscriber = this.eventManager.subscribe('careerListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.alertService.error(errorMessage);
    }
}
