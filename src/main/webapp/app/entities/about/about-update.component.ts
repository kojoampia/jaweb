import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IAbout, About } from 'app/shared/model/about.model';
import { AboutService } from './about.service';

@Component({
    selector: 'jhi-about-update',
    templateUrl: './about-update.component.html',
    styleUrls: ['../entities.components.scss']
})
export class AboutUpdateComponent implements OnInit {
    about: IAbout = new About();
    isSaving = false;
    createdDate = '';
    modifiedDate = '';

    constructor(protected aboutService: AboutService, protected activatedRoute: ActivatedRoute) {
       
    }

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ about }) => {
            this.about = about;
            this.createdDate = this.about.createdDate != null ? this.about.createdDate.format(DATE_TIME_FORMAT) : '';
            this.modifiedDate = this.about.modifiedDate != null ? this.about.modifiedDate.format(DATE_TIME_FORMAT) : '';
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.about.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : undefined;
        this.about.modifiedDate = this.modifiedDate != null ? moment(this.modifiedDate, DATE_TIME_FORMAT) : undefined;
        if (this.about.id !== undefined) {
            this.subscribeToSaveResponse(this.aboutService.update(this.about));
        } else {
            this.subscribeToSaveResponse(this.aboutService.create(this.about));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAbout>>) {
        result.subscribe((res: HttpResponse<IAbout>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    setContentChanged(data: string) {
        this.about.content = data;
    }
}
