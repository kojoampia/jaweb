import { Component, OnInit } from '@angular/core';
import { IPortfolio } from 'app/shared/model/portfolio.model';
import { PortfolioService } from './portfolio.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LocalStorage } from 'ngx-webstorage';

@Component({
    selector: 'jhi-portfolio-view',
    templateUrl: './portfolio-view.component.html',
    styleUrls: ['../entities.components.scss']
})
export class PortfolioViewComponent implements OnInit {
    portfolios: IPortfolio[];
    constructor(private portfolioService: PortfolioService, protected domSanitizer: DomSanitizer) {}

    ngOnInit() {
        if (!this.portfolios || this.portfolios.length === 0) {
            this.portfolioService.query({}).subscribe((result: any) => {
                this.portfolios = result.body;
            });
        }
    }

    sanitize(data: string): SafeHtml {
        return this.domSanitizer.bypassSecurityTrustHtml(data);
    }
}
