import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPrivilege } from 'app/shared/model/privilege.model';

@Component({
    selector: 'jhi-privilege-detail',
    templateUrl: './privilege-detail.component.html'
})
export class PrivilegeDetailComponent implements OnInit {
    privilege: IPrivilege;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ privilege }) => {
            this.privilege = privilege;
        });
    }

    previousState() {
        window.history.back();
    }
}
