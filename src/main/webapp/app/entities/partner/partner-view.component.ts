import { Component, OnInit } from '@angular/core';
import { IPartner } from 'app/shared/model/partner.model';
import { PartnerService } from './partner.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'jhi-partner-view',
    templateUrl: './partner-view.component.html',
    styles: []
})
export class PartnerViewComponent implements OnInit {
    partners: IPartner[] = [];
    constructor(private partnerService: PartnerService, private domSanitizer: DomSanitizer) {}

    ngOnInit() {
        this.partnerService.query({}).subscribe((res: any) => {
            this.partners = res.body;
        });
    }

    sanitize(data: string): SafeHtml {
        return this.domSanitizer.bypassSecurityTrustHtml(data);
    }
}
