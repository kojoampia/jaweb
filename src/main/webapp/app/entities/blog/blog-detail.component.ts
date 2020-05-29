import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBlog, Blog } from 'app/shared/model/blog.model';

@Component({
    selector: 'jhi-blog-detail',
    templateUrl: './blog-detail.component.html'
})
export class BlogDetailComponent implements OnInit {
    blog: IBlog = new Blog();

    constructor(protected activatedRoute: ActivatedRoute) {
        delete this.blog;
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ blog }) => {
            this.blog = blog;
        });
    }

    previousState() {
        window.history.back();
    }
}
