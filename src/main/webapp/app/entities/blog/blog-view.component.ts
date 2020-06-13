import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BlogService } from './blog.service';
import { IBlog, Blog } from 'app/shared/model/blog.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ScrollSpyService } from 'ngx-scrollspy';
import { LocalStorage, SessionStorage } from 'ngx-webstorage';

@Component({
    selector: 'jhi-blog-view',
    templateUrl: './blog-view.component.html',
    styleUrls: ['../entities.components.scss']
})
export class BlogViewComponent implements OnInit, AfterViewInit {
    @LocalStorage() blogs: IBlog[];
    page = 0;
    @SessionStorage() blog: IBlog = new Blog();

    constructor(protected blogService: BlogService, protected domSanitizer: DomSanitizer, protected scrollSpyService: ScrollSpyService) {
        delete this.blog;
    }

    ngOnInit() {
        if (!this.blogs || this.blogs.length === 0) {
            this.blogService.getRecentBlogs().subscribe((response: any) => {
                this.blogs = response.body;
                this.loadFirstPage();
            });
        } else {
            this.loadFirstPage();
        }
    }

    ngAfterViewInit() {
        this.scrollSpyService.getObservable('blogHeader').subscribe((e: any) => {
            console.log('blogHeader-scroll-spying...');
            console.log('blogHeader::ScrollSpy::window: ', e);
        });
    }

    loadFirstPage() {
        if (this.blogs && this.blogs.length) {
            this.blog = this.blogs[this.page];
        }
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

    safeContent(data: string): SafeHtml {
        return this.domSanitizer.bypassSecurityTrustHtml(data);
    }

    onScrollUp(target: HTMLElement) {
        target.scrollIntoView();
    }
}
