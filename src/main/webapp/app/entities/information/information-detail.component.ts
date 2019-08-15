import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInformation } from 'app/shared/model/information.model';

@Component({
    selector: 'jhi-information-detail',
    templateUrl: './information-detail.component.html',
    styleUrls: ['../entities.components.scss']
})
export class InformationDetailComponent implements OnInit {
    info: IInformation;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ information }) => {
            this.info = information;
        });
    }

    previousState() {
        window.history.back();
    }
}
