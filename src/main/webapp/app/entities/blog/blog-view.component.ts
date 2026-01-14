import { Component, OnInit } from '@angular/core';
import { BlogService } from './blog.service';
import { IBlog } from 'app/shared/model/blog.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ScrollSpyService } from 'ngx-scrollspy';
import { SessionStorage } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jhi-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['../entities.components.scss'],
})
export class BlogViewComponent implements OnInit {
  blogs: IBlog[];
  page = 0;
  @SessionStorage() blog: IBlog;
  eventSubscriber: Subscription;
  recentBlogs: any[] = [];
  archivedBlogs: any[] = [];
  archiveYears: any[];
  ready = false;
  archiveList: BlogArchive[] = [];

  constructor(
    protected blogService: BlogService,
    protected domSanitizer: DomSanitizer,
    protected eventManager: JhiEventManager,
    protected scrollSpyService: ScrollSpyService,
  ) {}

  ngOnInit() {
    this.registerChangeInBlogs();
    if (!this.blogs || this.blogs.length === 0) {
      this.blogService.query().subscribe((response: any) => {
        this.blogs = response.body;
        this.loadFirstPage();
      });
    } else {
      this.loadFirstPage();
    }
    setTimeout(() => {
      this.loadArchives();
    }, 100);
  }

  loadArchives() {
    this.blogService.getArchives().subscribe(res => {
      const blogsMap = res.body;
      console.log(blogsMap);
      if (blogsMap) {
        this.archivedBlogs = [];
        this.archiveYears = [];
        const keys = Object.getOwnPropertyNames(blogsMap);
        const values = Object.keys(blogsMap).map(item => {
          return blogsMap[item];
        });
        console.log(keys);
        console.log(values);
        this.archivedBlogs = values[0];
        const year = Number.parseInt(keys[0], 0);
        for (let i = 0; i < this.archivedBlogs.length; i++) {
          this.archivedBlogs[i].year = year;
        }
        console.log(this.archivedBlogs);
      }
    });
  }

  loadArchiveByYear(year: number) {
    const yearArchives = this.archivedBlogs.filter(item => item.id === year);
    console.log('loading for ' + year);
    console.log(yearArchives);
    return yearArchives;
  }

  loadFirstPage() {
    if (this.blogs && this.blogs.length) {
      this.blog = this.blogs[this.page];
      this.recentBlogs = [];
      this.blogs.forEach(blog => {
        this.recentBlogs.push({ key: blog.id, value: blog.title });
      });
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

  onSidebarItemSelected(item: any) {
    console.log('sidebar-item-selected');
    console.log(item);
    this.blog = this.blogs.find(blog => blog.id === item.key);
    console.log('Blog-found');
    console.log(this.blog);
  }
}

class BlogArchive {
  constructor(
    public id?: number,
    public key?: string,
    public value?: any,
  ) {}
}
