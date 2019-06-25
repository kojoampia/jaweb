import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IHome } from 'app/shared/model/home.model';
import { HomeService } from './home.service';

@Component({
    selector: 'jhi-home-update',
    templateUrl: './home-update.component.html'
})
export class HomeUpdateComponent implements OnInit {
    @Input() home: IHome;
    isSaving: boolean;
    createdDate: string;
    modifiedDate: string;
    @Output() closeHome: EventEmitter<any> = new EventEmitter<any>();

    constructor(protected homeService: HomeService) {}

    ngOnInit() {
        this.isSaving = false;
        if (this.home) {
            this.createdDate = this.home.createdDate != null ? this.home.createdDate.format(DATE_TIME_FORMAT) : null;
            this.modifiedDate = this.home.modifiedDate != null ? this.home.modifiedDate.format(DATE_TIME_FORMAT) : null;
        }
    }

    save() {
        this.isSaving = true;
        this.home.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        this.home.modifiedDate = this.modifiedDate != null ? moment(this.modifiedDate, DATE_TIME_FORMAT) : null;
        if (this.home.id !== undefined) {
            this.subscribeToSaveResponse(this.homeService.update(this.home));
        } else {
            this.subscribeToSaveResponse(this.homeService.create(this.home));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IHome>>) {
        result.subscribe((res: HttpResponse<IHome>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    close() {
        this.home = null;
        this.closeHome.emit('close');
    }
}
