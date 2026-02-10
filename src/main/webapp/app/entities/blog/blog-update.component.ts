import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IBlog, Blog } from 'app/shared/model/blog.model';
import { BlogService } from './blog.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EventManagerService } from 'app/core/services';

@Component({
    selector: 'jhi-blog-update',
    templateUrl: './blog-update.component.html',
    styleUrls: ['../entities.components.scss']
})
export class BlogUpdateComponent implements OnInit {
    blog: IBlog = new Blog();
    isSaving = false;
    createdDate = '';
    modifiedDate = '';
    content: SafeHtml = '';
    @SessionStorage() blogDataChanged = false;

    constructor(
        protected eventManager: JhiEventManager,
        protected blogService: BlogService,
        protected activatedRoute: ActivatedRoute,
        protected domSanitizer: DomSanitizer
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ blog }) => {
            this.blog = blog;
            this.updateContent(blog.content);
            this.createdDate = this.blog.createdDate != null ? this.blog.createdDate.format(DATE_TIME_FORMAT) : '';
            this.modifiedDate = this.blog.modifiedDate != null ? this.blog.modifiedDate.format(DATE_TIME_FORMAT) : '';
        });
    }

    setContentChanged(data: string): void {
        this.blog.content = data;
    }

    updateContent(data: string): void {
        this.content = this.domSanitizer.bypassSecurityTrustHtml(data);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.blog.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : undefined;
        this.blog.modifiedDate = this.modifiedDate != null ? moment(this.modifiedDate, DATE_TIME_FORMAT) : undefined;
        if (this.blog.id !== undefined) {
            this.subscribeToSaveResponse(this.blogService.update(this.blog));
        } else {
            this.subscribeToSaveResponse(this.blogService.create(this.blog));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IBlog>>) {
        result.subscribe((res: HttpResponse<IBlog>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess(blog) {
        this.isSaving = false;
        this.eventManager.broadcast({ name: 'blogListModification', blogItem: blog });
        this.blogDataChanged = true;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
