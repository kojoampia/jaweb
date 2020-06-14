import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IService, Service } from 'app/shared/model/service.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'jhi-service-detail',
    templateUrl: './service-detail.component.html',
    styleUrls: ['../entities.components.scss']
})
export class ServiceDetailComponent implements OnInit {
    @Input() service: IService;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute, protected domSanitizer: DomSanitizer) {}

    ngOnInit() {
        if (!this.service) {
            this.activatedRoute.data.subscribe(({ service }) => {
                this.service = service;
            });
        }
    }

    byteSize(field: any) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType: string, field: any) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    safeContent(data: string): SafeHtml {
        return this.domSanitizer.bypassSecurityTrustHtml(data);
    }
}
