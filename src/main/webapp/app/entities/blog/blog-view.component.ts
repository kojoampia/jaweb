import { Component, OnInit } from '@angular/core';
import { BlogService } from './blog.service';
import { IBlog, Blog } from 'app/shared/model/blog.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'jhi-blog-view',
    templateUrl: './blog-view.component.html',
    styleUrls: ['../entities.components.scss']
})
export class BlogViewComponent implements OnInit {
    blogs: IBlog[] = [];
    page = 0;
    blog: IBlog = new Blog();
    content: SafeHtml = '';

    constructor(protected blogService: BlogService, protected domSaniter: DomSanitizer) {
        delete this.blog;
    }

    ngOnInit() {
        this.blogService.getRecentBlogs().subscribe((response: any) => {
            this.blogs = response.body;
            if (this.blogs && this.blogs.length) {
                this.blog = this.blogs[this.page];
            }
        });
    }

    nextPage() {
        setTimeout(() => {
            this.page = this.page + 1;
            if (this.page === this.blogs.length) {
                this.page = this.blogs.length - 1;
            }
            this.blog = this.blogs[this.page];
        }, 5);
    }

    previousPage() {
        setTimeout(() => {
            this.page = this.page - 1;
            if (this.page < 0) {
                this.page = 0;
            }
            this.blog = this.blogs[this.page];
        }, 5);
    }

    safeContent(blogContent: string): SafeHtml {
        return this.domSaniter.bypassSecurityTrustHtml(blogContent);
    }

    onScrollUp(target: HTMLElement) {
        target.scrollIntoView();
    }
}
