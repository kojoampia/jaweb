import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContactMessage } from 'app/shared/model/contact-message.model';

@Component({
    selector: 'jhi-contact-message-detail',
    templateUrl: './contact-message-detail.component.html'
})
export class ContactMessageDetailComponent implements OnInit {
    contactMessage: IContactMessage;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ contactMessage }) => {
            this.contactMessage = contactMessage;
        });
    }

    previousState() {
        window.history.back();
    }
}
