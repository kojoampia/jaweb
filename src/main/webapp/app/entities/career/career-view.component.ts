import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ICareer } from '../../shared/model/career.model';
import { CareerService } from './career.service';
import { LocalStorage } from 'ngx-webstorage';

@Component({
    selector: 'jhi-career-view',
    templateUrl: './career-view.component.html',
    styleUrls: ['../entities.components.scss']
})
export class CareerViewComponent implements OnInit {
    @LocalStorage() careers: ICareer[];
    constructor(protected careerService: CareerService, protected domSanitizer: DomSanitizer) {}

    ngOnInit() {
        if (!this.careers || this.careers.length === 0) {
            this.careerService.query().subscribe((res: any) => {
                this.careers = res.body;
            });
        }
    }

    sanitize(data: string): SafeHtml {
        return this.domSanitizer.bypassSecurityTrustHtml(data);
    }
}
