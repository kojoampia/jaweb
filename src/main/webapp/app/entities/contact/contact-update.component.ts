import { Component, OnInit, ElementRef, inject } from '@angular/core';
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
import { IContact, Contact } from 'app/shared/model/contact.model';
import { ContactService } from './contact.service';

@Component({
    selector: 'jhi-contact-update',
    templateUrl: './contact-update.component.html',
    styleUrls: ['../entities.components.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule]
})
export class ContactUpdateComponent implements OnInit {
    contact: IContact = new Contact();
    isSaving = false;
    lastModified = '';

    private dataUtils = inject(DataUtils);
    private contactService = inject(ContactService);
    private elementRef = inject(ElementRef);
    private activatedRoute = inject(ActivatedRoute);

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
        this.contact.lastModified = this.lastModified != null ? dayjs(this.lastModified, DATE_TIME_FORMAT) : undefined;
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
