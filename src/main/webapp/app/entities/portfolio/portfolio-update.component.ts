import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils } from 'ng-jhipster';
import { IPortfolio } from 'app/shared/model/portfolio.model';
import { PortfolioService } from './portfolio.service';

@Component({
    selector: 'jhi-portfolio-update',
    templateUrl: './portfolio-update.component.html',
    styleUrls: ['../entities.components.scss']
})
export class PortfolioUpdateComponent implements OnInit {
    portfolio: IPortfolio;
    isSaving: boolean;
    createdDate: string;
    modifiedDate: string;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected portfolioService: PortfolioService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ portfolio }) => {
            this.portfolio = portfolio;
            this.createdDate = this.portfolio.createdDate != null ? this.portfolio.createdDate.format(DATE_TIME_FORMAT) : null;
            this.modifiedDate = this.portfolio.modifiedDate != null ? this.portfolio.modifiedDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.portfolio, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.portfolio.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        this.portfolio.modifiedDate = this.modifiedDate != null ? moment(this.modifiedDate, DATE_TIME_FORMAT) : null;
        if (this.portfolio.id !== undefined) {
            this.subscribeToSaveResponse(this.portfolioService.update(this.portfolio));
        } else {
            this.subscribeToSaveResponse(this.portfolioService.create(this.portfolio));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPortfolio>>) {
        result.subscribe((res: HttpResponse<IPortfolio>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
    setContentChanged(data: string) {
        this.portfolio.description = data;
    }
}
