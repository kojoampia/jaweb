import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IContact } from 'app/shared/model/contact.model';

@Component({
    selector: 'jhi-contact-detail',
    templateUrl: './contact-detail.component.html'
})
export class ContactDetailComponent implements OnInit {
    contact: IContact;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ contact }) => {
            this.contact = contact;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
