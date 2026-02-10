import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { IContactMessage } from 'app/shared/model/contact-message.model';
import { AlertErrorComponent } from 'app/shared/alert/alert-error.component';

@Component({
    selector: 'jhi-contact-message-detail',
    templateUrl: './contact-message-detail.component.html',
    standalone: true,
    imports: [CommonModule, AlertErrorComponent, FontAwesomeModule, RouterModule]
})
export class ContactMessageDetailComponent implements OnInit {
    contactMessage: IContactMessage | null = null;

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
