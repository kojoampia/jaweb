import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ICareer } from 'app/shared/model/career.model';
import { CareerService } from './career.service';

@Component({
    selector: 'jhi-career-update',
    templateUrl: './career-update.component.html'
})
export class CareerUpdateComponent implements OnInit {
    career: ICareer;
    isSaving: boolean;
    createdDate: string;
    modifiedDate: string;

    constructor(protected careerService: CareerService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ career }) => {
            this.career = career;
            this.createdDate = this.career.createdDate != null ? this.career.createdDate.format(DATE_TIME_FORMAT) : null;
            this.modifiedDate = this.career.modifiedDate != null ? this.career.modifiedDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.career.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        this.career.modifiedDate = this.modifiedDate != null ? moment(this.modifiedDate, DATE_TIME_FORMAT) : null;
        if (this.career.id !== undefined) {
            this.subscribeToSaveResponse(this.careerService.update(this.career));
        } else {
            this.subscribeToSaveResponse(this.careerService.create(this.career));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICareer>>) {
        result.subscribe((res: HttpResponse<ICareer>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
