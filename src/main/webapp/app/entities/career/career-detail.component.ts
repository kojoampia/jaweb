import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICareer } from 'app/shared/model/career.model';

@Component({
    selector: 'jhi-career-detail',
    templateUrl: './career-detail.component.html'
})
export class CareerDetailComponent implements OnInit {
    career: ICareer;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ career }) => {
            this.career = career;
        });
    }

    previousState() {
        window.history.back();
    }
}
