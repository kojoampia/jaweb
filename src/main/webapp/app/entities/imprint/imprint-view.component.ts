import { Component, OnInit } from '@angular/core';
import { IImprint } from 'app/shared/model/imprint.model';
import { ImprintService } from './imprint.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LocalStorage } from 'ngx-webstorage';

@Component({
    selector: 'jhi-imprint-view',
    templateUrl: './imprint-view.component.html',
    styleUrls: ['../entities.components.scss']
})
export class ImprintViewComponent implements OnInit {
    @LocalStorage() imprint: IImprint;
    constructor(private imprintService: ImprintService, private sanitizer: DomSanitizer) {}

    ngOnInit() {
        if (!this.imprint) {
            this.imprintService.query({}).subscribe((res: any) => {
                this.imprint = res.body[0];
            });
        }
    }

    sanitize(data: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(data);
    }
}
