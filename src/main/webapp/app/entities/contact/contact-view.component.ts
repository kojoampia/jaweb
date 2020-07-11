import { Component, OnInit, Input } from '@angular/core';
import { IContact } from 'app/shared/model/contact.model';
import { ContactService } from './contact.service';
import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LocalStorage } from 'ngx-webstorage';
import { ContactMessageService } from '../contact-message';
import { ContactMessage, IContactMessage } from 'app/shared/model/contact-message.model';
import { Observable } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-contact-view',
    templateUrl: './contact-view.component.html',
    styleUrls: ['../entities.components.scss']
})
export class ContactViewComponent implements OnInit {
    contact: IContact;
    message: any;
    isSending = false;
    isVisible = false;
    isSent = false;
    isError = false;

    constructor(
        private contactService: ContactService,
        private contactMessageService: ContactMessageService,
        private domSanitizer: DomSanitizer
    ) {}

    ngOnInit() {
        if (!this.contact) {
            this.contactService.query({}).subscribe((res: any) => {
                this.contact = res.body[0];
            });
        }
        this.setMessage();
    }

    sendMessage(data: any) {
        const contactMessage: ContactMessage = new ContactMessage();
        contactMessage.email = data.senderEmail;
        contactMessage.name = data.senderName;
        contactMessage.title = data.title;
        contactMessage.message = data.content;
        this.isSending = true;
        this.subscribeToSaveResponse(this.contactMessageService.create(contactMessage));
    }

    sanitzer(data: string): SafeHtml {
        return this.domSanitizer.bypassSecurityTrustHtml(data);
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IContactMessage>>) {
        result.subscribe((res: HttpResponse<IContactMessage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isError = false;
        this.isSending = false;
        this.isSent = true;
        this.setMessage();
        setTimeout(() => {
            this.isSent = false;
        }, 5000);
    }

    protected onSaveError() {
        this.isSending = false;
        this.isError = true;
        setTimeout(() => {
            this.isError = false;
        }, 5000);
    }

    setMessage() {
        this.message = {
            id: '',
            senderName: '',
            senderEmail: '',
            title: '',
            content: ''
        };
        this.isVisible = false;
    }
}
