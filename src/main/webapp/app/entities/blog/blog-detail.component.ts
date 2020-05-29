import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBlog, Blog } from 'app/shared/model/blog.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'jhi-blog-detail',
    templateUrl: './blog-detail.component.html',
    styleUrls: ['../entities.components.scss']
})
export class BlogDetailComponent implements OnInit {
    blog: IBlog = new Blog();
    content: SafeHtml = '';

    constructor(protected activatedRoute: ActivatedRoute, protected domSanitizer: DomSanitizer) {
        delete this.blog;
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ blog }) => {
            this.blog = blog;
            this.updateContent(blog.content);
        });
    }

    updateContent(data: string): void {
        this.content = this.domSanitizer.bypassSecurityTrustHtml(data);
    }

    previousState() {
        window.history.back();
    }
}
