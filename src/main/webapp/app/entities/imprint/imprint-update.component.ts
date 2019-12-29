import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IImprint } from 'app/shared/model/imprint.model';
import { ImprintService } from './imprint.service';

@Component({
    selector: 'jhi-imprint-update',
    templateUrl: './imprint-update.component.html'
})
export class ImprintUpdateComponent implements OnInit {
    imprint: IImprint;
    isSaving: boolean;
    createdDate: string;
    modifiedDate: string;

    constructor(protected imprintService: ImprintService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ imprint }) => {
            this.imprint = imprint;
            this.createdDate = this.imprint.createdDate != null ? this.imprint.createdDate.format(DATE_TIME_FORMAT) : null;
            this.modifiedDate = this.imprint.modifiedDate != null ? this.imprint.modifiedDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.imprint.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        this.imprint.modifiedDate = this.modifiedDate != null ? moment(this.modifiedDate, DATE_TIME_FORMAT) : null;
        if (this.imprint.id !== undefined) {
            this.subscribeToSaveResponse(this.imprintService.update(this.imprint));
        } else {
            this.subscribeToSaveResponse(this.imprintService.create(this.imprint));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IImprint>>) {
        result.subscribe((res: HttpResponse<IImprint>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
