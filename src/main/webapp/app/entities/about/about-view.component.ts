import { Component, OnInit } from '@angular/core';
import { IAbout } from 'app/shared/model/about.model';
import { AboutService } from './about.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LocalStorage } from 'ngx-webstorage';

@Component({
    selector: 'jhi-about-view',
    templateUrl: './about-view.component.html',
    styleUrls: ['../entities.components.scss']
})
export class AboutViewComponent implements OnInit {
    @LocalStorage() about: IAbout;
    constructor(private aboutService: AboutService, private sanitizer: DomSanitizer) {}

    ngOnInit() {
        if (!this.about) {
            this.aboutService.query({}).subscribe((res: any) => {
                this.about = res.body[0];
            });
        }
    }

    sanitize(data: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(data);
    }
}
