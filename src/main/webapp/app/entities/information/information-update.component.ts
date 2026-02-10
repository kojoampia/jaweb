import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AlertService } from 'app/core/services';
import { IInformation } from 'app/shared/model/information.model';
import { InformationService } from './information.service';
import { IHome } from 'app/shared/model/home.model';
import { HomeService } from 'app/entities/home';

@Component({
    selector: 'jhi-information-update',
    templateUrl: './information-update.component.html',
    styleUrls: ['../entities.components.scss']
})
export class InformationUpdateComponent implements OnInit {
    information: IInformation;
    isSaving: boolean;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected informationService: InformationService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ information }) => {
            this.information = information;
            if (this.information.content === undefined || this.information.content === null) {
                this.information.content = '';
            }
        });
    }

    setContentChanged(data: string): void {
        this.information.content = data;
    }
    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.information.id !== undefined) {
            this.subscribeToSaveResponse(this.informationService.update(this.information));
        } else {
            this.subscribeToSaveResponse(this.informationService.create(this.information));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IInformation>>) {
        result.subscribe((res: HttpResponse<IInformation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackHomeById(index: number, item: IHome) {
        return item.id;
    }
}
