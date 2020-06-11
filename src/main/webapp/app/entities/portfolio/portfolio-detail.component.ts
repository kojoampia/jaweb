import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IPortfolio } from 'app/shared/model/portfolio.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'jhi-portfolio-detail',
    templateUrl: './portfolio-detail.component.html',
    styleUrls: ['../entities.components.scss']
})
export class PortfolioDetailComponent implements OnInit {
    portfolio: IPortfolio;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute, protected domSanitizer: DomSanitizer) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ portfolio }) => {
            this.portfolio = portfolio;
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
    sanitize(data: string): SafeHtml {
        return this.domSanitizer.bypassSecurityTrustHtml(data);
    }
}
