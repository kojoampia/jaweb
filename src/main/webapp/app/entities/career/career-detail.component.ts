import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICareer } from 'app/shared/model/career.model';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'jhi-career-detail',
    templateUrl: './career-detail.component.html',
    styleUrls: ['../entities.components.scss']
})
export class CareerDetailComponent implements OnInit {
    @Input() career: ICareer;
    @Input() embed = false;

    constructor(protected activatedRoute: ActivatedRoute, protected domSanitizer: DomSanitizer) {}

    ngOnInit() {
        if (!this.career) {
            this.activatedRoute.data.subscribe(({ career }) => {
                this.career = career;
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
