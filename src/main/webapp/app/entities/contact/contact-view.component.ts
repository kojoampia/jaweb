import { Component, OnInit, Input } from '@angular/core';
import { IContact } from 'app/shared/model/contact.model';
import { ContactService } from './contact.service';
import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'jhi-contact-view',
    templateUrl: './contact-view.component.html',
    styleUrls: ['../entities.components.scss']
})
export class ContactViewComponent implements OnInit {
    @Input() contact: IContact;
    @Input() embed = false;
    constructor(private contactService: ContactService, private domSanitizer: DomSanitizer) {}

    ngOnInit() {
        this.contactService.query({}).subscribe((res: any) => {
            this.contact = res.body[0];
        });
    }

    sanitzer(data: string): SafeHtml {
        return this.domSanitizer.bypassSecurityTrustHtml(data);
    }
}
