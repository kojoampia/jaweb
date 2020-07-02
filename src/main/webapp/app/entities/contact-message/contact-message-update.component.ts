import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IContactMessage } from 'app/shared/model/contact-message.model';
import { ContactMessageService } from './contact-message.service';

@Component({
    selector: 'jhi-contact-message-update',
    templateUrl: './contact-message-update.component.html'
})
export class ContactMessageUpdateComponent implements OnInit {
    contactMessage: IContactMessage;
    isSaving: boolean;
    createdDate: string;

    constructor(protected contactMessageService: ContactMessageService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ contactMessage }) => {
            this.contactMessage = contactMessage;
            this.createdDate = this.contactMessage.createdDate != null ? this.contactMessage.createdDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.contactMessage.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        if (this.contactMessage.id !== undefined) {
            this.subscribeToSaveResponse(this.contactMessageService.update(this.contactMessage));
        } else {
            this.subscribeToSaveResponse(this.contactMessageService.create(this.contactMessage));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IContactMessage>>) {
        result.subscribe((res: HttpResponse<IContactMessage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
