import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHome } from 'app/shared/model/home.model';

@Component({
    selector: 'jhi-home-detail',
    templateUrl: './home-detail.component.html'
})
export class HomeDetailComponent implements OnInit {
    home: IHome;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ home }) => {
            this.home = home;
        });
    }

    previousState() {
        window.history.back();
    }
}
