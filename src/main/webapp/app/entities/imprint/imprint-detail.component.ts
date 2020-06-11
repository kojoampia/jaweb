import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IImprint } from 'app/shared/model/imprint.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'jhi-imprint-detail',
    templateUrl: './imprint-detail.component.html',
    styleUrls: ['../entities.components.scss']
})
export class ImprintDetailComponent implements OnInit {
    @Input() imprint: IImprint;
    @Input() embed = false;

    constructor(protected activatedRoute: ActivatedRoute, protected domSanitizer: DomSanitizer) {}

    ngOnInit() {
        if (!this.imprint) {
            this.activatedRoute.data.subscribe(({ imprint }) => {
                this.imprint = imprint;
            });
        }
    }

    previousState() {
        window.history.back();
    }

    sanitize(data: string): SafeHtml {
        return this.domSanitizer.bypassSecurityTrustHtml(data);
    }
}
