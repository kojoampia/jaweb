import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAbout, About } from 'app/shared/model/about.model';

@Component({
    selector: 'jhi-about-detail',
    templateUrl: './about-detail.component.html',
    styleUrls: ['../entities.components.scss']
})
export class AboutDetailComponent implements OnInit {
    @Input() about: IAbout;
    @Input() embed = false;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        if (!this.about) {
            this.activatedRoute.data.subscribe(({ about }) => {
                this.about = about;
            });
        }
    }

    previousState() {
        window.history.back();
    }
}
