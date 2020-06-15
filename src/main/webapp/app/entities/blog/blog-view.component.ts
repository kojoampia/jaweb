import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BlogService } from './blog.service';
import { IBlog, Blog } from 'app/shared/model/blog.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ScrollSpyService } from 'ngx-scrollspy';
import { LocalStorage, SessionStorage } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';
import { Subscriber, Subscription } from 'rxjs';

@Component({
    selector: 'jhi-blog-view',
    templateUrl: './blog-view.component.html',
    styleUrls: ['../entities.components.scss']
})
export class BlogViewComponent implements OnInit, AfterViewInit {
    @LocalStorage() blogs: IBlog[];
    page = 0;
    @SessionStorage() blog: IBlog;
    eventSubscriber: Subscription;

    constructor(
        protected blogService: BlogService,
        protected domSanitizer: DomSanitizer,
        protected eventManager: JhiEventManager,
        protected scrollSpyService: ScrollSpyService
    ) {}

    ngOnInit() {
        this.registerChangeInBlogs();
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

    registerChangeInBlogs() {
        this.eventSubscriber = this.eventManager.subscribe('blogListModification', (response: any) => this.resetBlogs(response));
    }

    resetBlogs(item: any) {
        console.log('Resetting blogs' + item);
        this.blog = null;
        this.blogs = [];
    }
}
