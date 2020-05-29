import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils } from 'ng-jhipster';
import { IContact, Contact } from 'app/shared/model/contact.model';
import { ContactService } from './contact.service';

@Component({
    selector: 'jhi-contact-update',
    templateUrl: './contact-update.component.html'
})
export class ContactUpdateComponent implements OnInit {
    contact: IContact = new Contact();
    isSaving = false;
    lastModified = '';

    constructor(
        protected dataUtils: JhiDataUtils,
        protected contactService: ContactService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ contact }) => {
            this.contact = contact;
            this.lastModified = this.contact.lastModified != null ? this.contact.lastModified.format(DATE_TIME_FORMAT) : '';
        });
    }

    byteSize(field: any) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType: string, field: any) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event: any, entity: any, field: any, isImage: any) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.contact, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.contact.lastModified = this.lastModified != null ? moment(this.lastModified, DATE_TIME_FORMAT) : undefined;
        if (this.contact.id !== undefined) {
            this.subscribeToSaveResponse(this.contactService.update(this.contact));
        } else {
            this.subscribeToSaveResponse(this.contactService.create(this.contact));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IContact>>) {
        result.subscribe((res: HttpResponse<IContact>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
