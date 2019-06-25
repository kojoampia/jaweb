import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHome } from 'app/shared/model/home.model';

@Component({
    selector: 'jhi-home-detail',
    templateUrl: './home-detail.component.html'
})
export class HomeDetailComponent implements OnInit {
    @Input() home: IHome;

    constructor() {}

    ngOnInit() {
        console.log(this.home);
    }

    close() {
        this.home = null;
    }
}
