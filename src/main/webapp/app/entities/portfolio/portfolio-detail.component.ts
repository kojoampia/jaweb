import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IPortfolio } from 'app/shared/model/portfolio.model';

@Component({
    selector: 'jhi-portfolio-detail',
    templateUrl: './portfolio-detail.component.html'
})
export class PortfolioDetailComponent implements OnInit {
    portfolio: IPortfolio;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

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
}
