import { Component, OnInit, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DataUtils } from 'app/core/services/data-utils.service';

import { IPortfolio } from 'app/shared/model/portfolio.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'jhi-portfolio-detail',
    templateUrl: './portfolio-detail.component.html',
    styleUrls: ['../entities.components.scss']
})
export class PortfolioDetailComponent implements OnInit {
    @Input() portfolio: IPortfolio;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute, protected domSanitizer: DomSanitizer) {}

    ngOnInit() {
        if (!this.portfolio) {
            this.activatedRoute.data.subscribe(({ portfolio }) => {
                this.portfolio = portfolio;
            });
        }
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
