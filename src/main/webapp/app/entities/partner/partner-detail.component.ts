import { Component, OnInit, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DataUtils } from 'app/core/services/data-utils.service';

import { IPartner } from 'app/shared/model/partner.model';

@Component({
    selector: 'jhi-partner-detail',
    templateUrl: './partner-detail.component.html'
})
export class PartnerDetailComponent implements OnInit {
    partner: IPartner;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ partner }) => {
            this.partner = partner;
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
