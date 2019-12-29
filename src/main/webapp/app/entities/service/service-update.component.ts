import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils } from 'ng-jhipster';
import { IService } from 'app/shared/model/service.model';
import { ServiceService } from './service.service';

@Component({
    selector: 'jhi-service-update',
    templateUrl: './service-update.component.html'
})
export class ServiceUpdateComponent implements OnInit {
    service: IService;
    isSaving: boolean;
    createdDate: string;
    modifiedDate: string;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected serviceService: ServiceService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ service }) => {
            this.service = service;
            this.createdDate = this.service.createdDate != null ? this.service.createdDate.format(DATE_TIME_FORMAT) : null;
            this.modifiedDate = this.service.modifiedDate != null ? this.service.modifiedDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.service, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.service.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        this.service.modifiedDate = this.modifiedDate != null ? moment(this.modifiedDate, DATE_TIME_FORMAT) : null;
        if (this.service.id !== undefined) {
            this.subscribeToSaveResponse(this.serviceService.update(this.service));
        } else {
            this.subscribeToSaveResponse(this.serviceService.create(this.service));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IService>>) {
        result.subscribe((res: HttpResponse<IService>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
