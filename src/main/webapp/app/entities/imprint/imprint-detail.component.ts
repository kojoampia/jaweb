import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IImprint } from 'app/shared/model/imprint.model';

@Component({
    selector: 'jhi-imprint-detail',
    templateUrl: './imprint-detail.component.html'
})
export class ImprintDetailComponent implements OnInit {
    imprint: IImprint;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ imprint }) => {
            this.imprint = imprint;
        });
    }

    previousState() {
        window.history.back();
    }
}
