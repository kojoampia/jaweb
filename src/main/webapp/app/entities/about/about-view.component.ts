import { Component, OnInit } from '@angular/core';
import { IAbout } from 'app/shared/model/about.model';
import { AboutService } from './about.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'jhi-about-view',
    templateUrl: './about-view.component.html',
    styleUrls: ['../entities.components.scss']
})
export class AboutViewComponent implements OnInit {
    about: IAbout;
    constructor(private aboutService: AboutService, private sanitizer: DomSanitizer) {}

    ngOnInit() {
        this.aboutService.query({}).subscribe((res: any) => {
            this.about = res.body[0];
        });
    }

    sanitize(data: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(data);
    }
}
