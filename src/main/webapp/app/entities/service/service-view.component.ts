import { Component, OnInit } from '@angular/core';
import { IService } from 'app/shared/model/service.model';
import { ServiceService } from './service.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-service-view',
    templateUrl: './service-view.component.html',
    styleUrls: ['../entities.components.scss']
})
export class ServiceViewComponent implements OnInit {
    services: IService[] = [];

    constructor(protected restService: ServiceService, protected domSanitizer: DomSanitizer) {}

    ngOnInit() {
        this.restService.query().subscribe((res: HttpResponse<IService[]>) => {
            this.services = res.body || [];
        });
    }

    safeContent(data: string): SafeHtml {
        return this.domSanitizer.bypassSecurityTrustHtml(data);
    }
}
