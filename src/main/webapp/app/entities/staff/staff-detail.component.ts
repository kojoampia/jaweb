import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IStaff } from 'app/shared/model/staff.model';

@Component({
    selector: 'jhi-staff-detail',
    templateUrl: './staff-detail.component.html'
})
export class StaffDetailComponent implements OnInit {
    staff: IStaff;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ staff }) => {
            this.staff = staff;
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
