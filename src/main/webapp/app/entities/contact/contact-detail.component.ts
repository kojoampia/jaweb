import { Component, OnInit, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DataUtils } from 'app/core/services/data-utils.service';

import { IContact, Contact } from 'app/shared/model/contact.model';

@Component({
    selector: 'jhi-contact-detail',
    templateUrl: './contact-detail.component.html',
    styleUrls: ['../entities.components.scss'],
    standalone: true,
    imports: [CommonModule, RouterModule]
})
export class ContactDetailComponent implements OnInit {
    @Input() contact: IContact = new Contact();
    @Input() embed = false;

    private dataUtils = inject(DataUtils);
    private activatedRoute = inject(ActivatedRoute);

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
