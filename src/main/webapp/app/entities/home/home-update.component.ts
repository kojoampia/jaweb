import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IHome } from 'app/shared/model/home.model';
import { HomeService } from './home.service';
import { IInformation } from 'app/shared/model/information.model';
import { InformationService } from 'app/entities/information';

@Component({
    selector: 'jhi-home-update',
    templateUrl: './home-update.component.html'
})
export class HomeUpdateComponent implements OnInit {
    home: IHome;
    isSaving: boolean;

    information: IInformation[];
    createdDate: string;
    modifiedDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected homeService: HomeService,
        protected informationService: InformationService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ home }) => {
            this.home = home;
            this.createdDate = this.home.createdDate != null ? this.home.createdDate.format(DATE_TIME_FORMAT) : null;
            this.modifiedDate = this.home.modifiedDate != null ? this.home.modifiedDate.format(DATE_TIME_FORMAT) : null;
        });
        this.informationService
            .query({ filter: 'home-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IInformation[]>) => mayBeOk.ok),
                map((response: HttpResponse<IInformation[]>) => response.body)
            )
            .subscribe(
                (res: IInformation[]) => {
                    if (!this.home.information || !this.home.information.id) {
                        this.information = res;
                    } else {
                        this.informationService
                            .find(this.home.information.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IInformation>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IInformation>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IInformation) => (this.information = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.home.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        this.home.modifiedDate = this.modifiedDate != null ? moment(this.modifiedDate, DATE_TIME_FORMAT) : null;
        if (this.home.id !== undefined) {
            this.subscribeToSaveResponse(this.homeService.update(this.home));
        } else {
            this.subscribeToSaveResponse(this.homeService.create(this.home));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IHome>>) {
        result.subscribe((res: HttpResponse<IHome>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackInformationById(index: number, item: IInformation) {
        return item.id;
    }
}
