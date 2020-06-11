import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IContact, Contact } from 'app/shared/model/contact.model';

@Component({
    selector: 'jhi-contact-detail',
    templateUrl: './contact-detail.component.html',
    styleUrls: ['../entities.components.scss']
})
export class ContactDetailComponent implements OnInit {
    @Input() contact: IContact = new Contact();
    @Input() embed = false;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {
        delete this.contact;
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ contact }) => {
            this.contact = contact;
        });
    }

    byteSize(field: any) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType: any, field: any) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
