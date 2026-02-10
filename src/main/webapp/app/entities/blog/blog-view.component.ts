import { Component, OnInit, OnDestroy, signal, inject } from '@angular/core';
import { BlogService } from './blog.service';
import { IBlog } from 'app/shared/model/blog.model';
import { DomSanitizer, SafeHtml, CommonModule } from '@angular/platform-browser';
import { ScrollSpyService } from '@uniprank/ngx-scrollspy';
import { StorageService } from 'app/core/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RouterModule } from '@angular/router';
import { EventManagerService } from 'app/core/services';
import type { Subscription } from 'rxjs';

@Component({
  selector: 'jhi-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['../entities.components.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class BlogViewComponent implements OnInit, OnDestroy {
  private blogService = inject(BlogService);
  private domSanitizer = inject(DomSanitizer);
  private eventManager = inject(EventManagerService);
  private scrollSpyService = inject(ScrollSpyService);
  private storageService = inject(StorageService);
  private destroy$ = new Subject<void>();
  
  blogs = signal<IBlog[]>([]);
  page = signal(0);
  blog = this.storageService.createLocalStorageSignal<IBlog>('blog', null);
  eventSubscriber: Subscription;
  recentBlogs = signal<any[]>([]);
  archivedBlogs = signal<any[]>([]);
  archiveYears = signal<any[]>([]);
  ready = signal(false);
  archiveList = signal<BlogArchive[]>([]);

  ngOnInit() {
    this.registerChangeInBlogs();
    if (!this.blogs() || this.blogs().length === 0) {
      this.blogService.query().pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
        this.blogs.set(response.body);
        this.loadFirstPage();
      });
    } else {
      this.loadFirstPage();
    }
    setTimeout(() => {
      this.loadArchives();
    }, 100);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  loadArchives() {
    this.blogService.getArchives().pipe(takeUntil(this.destroy$)).subscribe(res => {
      const blogsMap = res.body;
      console.log(blogsMap);
      if (blogsMap) {
        this.archivedBlogs.set([]);
        this.archiveYears.set([]);
        const keys = Object.getOwnPropertyNames(blogsMap);
        const values = Object.keys(blogsMap).map(item => {
          return blogsMap[item];
        });
        console.log(keys);
        console.log(values);
        this.archivedBlogs.set(values[0]);
        const year = Number.parseInt(keys[0], 0);
        const archived = this.archivedBlogs();
        for (let i = 0; i < archived.length; i++) {
          archived[i].year = year;
        }
        this.archivedBlogs.set(archived);
        console.log(this.archivedBlogs());
      }
    });
  }

  loadArchiveByYear(year: number) {
    const yearArchives = this.archivedBlogs().filter(item => item.id === year);
    console.log('loading for ' + year);
    console.log(yearArchives);
    return yearArchives;
  }

  loadFirstPage() {
    const blogsValue = this.blogs();
    if (blogsValue && blogsValue.length) {
      this.blog.set(blogsValue[this.page()]);
      const recentBlogsValue: any[] = [];
      blogsValue.forEach(blog => {
        recentBlogsValue.push({ key: blog.id, value: blog.title });
      });
      this.recentBlogs.set(recentBlogsValue);
    }
  }

  nextPage() {
    setTimeout(() => {
      let newPage = this.page() + 1;
      const blogsLength = this.blogs().length;
      if (newPage === blogsLength) {
        newPage = blogsLength - 1;
      }
      this.page.set(newPage);
      this.blog.set(this.blogs()[newPage]);
    }, 5);
  }

  previousPage() {
    setTimeout(() => {
      let newPage = this.page() - 1;
      if (newPage < 0) {
        newPage = 0;
      }
      this.page.set(newPage);
      this.blog.set(this.blogs()[newPage]);
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
    this.blog.set(null);
    this.blogs.set([]);
  }

  onSidebarItemSelected(item: any) {
    console.log('sidebar-item-selected');
    console.log(item);
    const foundBlog = this.blogs().find(blog => blog.id === item.key);
    this.blog.set(foundBlog);
    console.log('Blog-found');
    console.log(this.blog());
  }
}

class BlogArchive {
  constructor(
    public id?: number,
    public key?: string,
    public value?: any,
  ) {}
}
