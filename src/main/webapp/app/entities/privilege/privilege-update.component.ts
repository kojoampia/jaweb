import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IPrivilege } from 'app/shared/model/privilege.model';
import { PrivilegeService } from './privilege.service';

@Component({
    selector: 'jhi-privilege-update',
    templateUrl: './privilege-update.component.html'
})
export class PrivilegeUpdateComponent implements OnInit {
    privilege: IPrivilege;
    isSaving: boolean;
    createdDate: string;

    constructor(protected privilegeService: PrivilegeService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ privilege }) => {
            this.privilege = privilege;
            this.createdDate = this.privilege.createdDate != null ? this.privilege.createdDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.privilege.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        if (this.privilege.id !== undefined) {
            this.subscribeToSaveResponse(this.privilegeService.update(this.privilege));
        } else {
            this.subscribeToSaveResponse(this.privilegeService.create(this.privilege));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrivilege>>) {
        result.subscribe((res: HttpResponse<IPrivilege>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
