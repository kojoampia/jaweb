import { Component, OnInit, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DataUtils } from 'app/core/services/data-utils.service';

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
