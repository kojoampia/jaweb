import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IStaff } from 'app/shared/model/staff.model';
import { StaffService } from './staff.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-staff-update',
    templateUrl: './staff-update.component.html'
})
export class StaffUpdateComponent implements OnInit {
    staff: IStaff;
    isSaving: boolean;

    users: IUser[];
    dateOfBirthDp: any;
    createdDate: string;
    modifiedDate: string;

    constructor(
        // protected dataUtils: JhiDataUtils,
        // protected jhiAlertService: JhiAlertService,
        protected staffService: StaffService,
        protected userService: UserService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ staff }) => {
            this.staff = staff;
            this.createdDate = this.staff.createdDate != null ? this.staff.createdDate.format(DATE_TIME_FORMAT) : null;
            this.modifiedDate = this.staff.modifiedDate != null ? this.staff.modifiedDate.format(DATE_TIME_FORMAT) : null;
        });
        this.userService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUser[]>) => response.body)
            )
            .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        // return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        // return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        // this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        // this.dataUtils.clearInputImage(this.staff, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.staff.createdDate = this.createdDate != null ? dayjs(this.createdDate, DATE_TIME_FORMAT) : null;
        this.staff.modifiedDate = this.modifiedDate != null ? dayjs(this.modifiedDate, DATE_TIME_FORMAT) : null;
        if (this.staff.id !== undefined) {
            this.subscribeToSaveResponse(this.staffService.update(this.staff));
        } else {
            this.subscribeToSaveResponse(this.staffService.create(this.staff));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IStaff>>) {
        result.subscribe((res: HttpResponse<IStaff>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        // this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
}
