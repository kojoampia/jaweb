import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAbout } from 'app/shared/model/about.model';

@Component({
    selector: 'jhi-about-detail',
    templateUrl: './about-detail.component.html'
})
export class AboutDetailComponent implements OnInit {
    about: IAbout;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ about }) => {
            this.about = about;
        });
    }

    previousState() {
        window.history.back();
    }
}
