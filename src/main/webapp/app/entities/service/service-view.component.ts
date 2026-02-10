import { Component, OnInit, Input } from '@angular/core';
import { IService } from 'app/shared/model/service.model';
import { ServiceService } from './service.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from 'app/layouts/footer/footer.component';

@Component({
    selector: 'jhi-service-view',
    templateUrl: './service-view.component.html',
    styleUrls: ['../entities.components.scss'],
    standalone: true,
    imports: [CommonModule, RouterModule, FooterComponent]
})
export class ServiceViewComponent implements OnInit {
    services: IService[] = [];

    constructor(protected restService: ServiceService, protected domSanitizer: DomSanitizer) {}

    ngOnInit() {
        if (!this.services || this.services.length === 0) {
            this.restService.query().subscribe((res: HttpResponse<IService[]>) => {
                this.services = res.body || [];
            });
        }
    }

    safeContent(data: string): SafeHtml {
        return this.domSanitizer.bypassSecurityTrustHtml(data);
    }
}
