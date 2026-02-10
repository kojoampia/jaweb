import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';


import { IInformation, Information } from 'app/shared/model/information.model';
import { AccountService } from 'app/core';
import { InformationService } from './information.service';
import { AlertService } from 'app/core/services/alert.service';

@Component({
    selector: 'jhi-information',
    templateUrl: './information.component.html',
    styleUrls: ['../entities.components.scss']
})
export class InformationComponent implements OnInit, OnDestroy {
    information: IInformation[];
    currentAccount: any;
    currentSearch: string;
    info: Information;

    constructor(
        protected informationService: InformationService,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService,
        protected alertService: AlertService
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
                    this.info = res[0];
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
        this.accountService.identity().subscribe(account => {
            this.currentAccount = account;
        });
    }

    trackId(index: number, item: IInformation) {
        return item.id;
    }

    protected onError(errorMessage: string) {
        this.alertService.addAlert({ type: 'danger', message: errorMessage });
    }
}
