import { Component, OnInit, ElementRef, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { DataUtils } from 'app/core/services/data-utils.service';
import { IService, Service } from 'app/shared/model/service.model';
import { ServiceService } from './service.service';

@Component({
    selector: 'jhi-service-update',
    templateUrl: './service-update.component.html',
    styleUrls: ['../entities.components.scss']
})
export class ServiceUpdateComponent implements OnInit {
    service: IService = new Service();
    isSaving = false;
    createdDate = dayjs(new Date()).toISOString();
    modifiedDate = dayjs(new Date()).toISOString();
    defaultDate = dayjs(new Date()).toISOString();

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
            this.createdDate = this.service.createdDate != null ? this.service.createdDate.format(DATE_TIME_FORMAT) : this.defaultDate;
            this.modifiedDate = this.service.modifiedDate != null ? this.service.modifiedDate.format(DATE_TIME_FORMAT) : this.defaultDate;
        });
    }

    setContentChanged(data: string): void {
        this.service.description = data;
    }

    byteSize(field: any) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType: string, field: any) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event: any, entity: any, field: any, isImage: boolean) {
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
        this.service.createdDate = this.createdDate != null ? dayjs(this.createdDate, DATE_TIME_FORMAT) : undefined;
        this.service.modifiedDate = this.modifiedDate != null ? dayjs(this.modifiedDate, DATE_TIME_FORMAT) : undefined;
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
