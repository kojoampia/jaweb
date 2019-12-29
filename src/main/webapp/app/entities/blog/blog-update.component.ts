import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IBlog } from 'app/shared/model/blog.model';
import { BlogService } from './blog.service';

@Component({
    selector: 'jhi-blog-update',
    templateUrl: './blog-update.component.html'
})
export class BlogUpdateComponent implements OnInit {
    blog: IBlog;
    isSaving: boolean;
    createdDate: string;
    modifiedDate: string;

    constructor(protected blogService: BlogService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ blog }) => {
            this.blog = blog;
            this.createdDate = this.blog.createdDate != null ? this.blog.createdDate.format(DATE_TIME_FORMAT) : null;
            this.modifiedDate = this.blog.modifiedDate != null ? this.blog.modifiedDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.blog.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        this.blog.modifiedDate = this.modifiedDate != null ? moment(this.modifiedDate, DATE_TIME_FORMAT) : null;
        if (this.blog.id !== undefined) {
            this.subscribeToSaveResponse(this.blogService.update(this.blog));
        } else {
            this.subscribeToSaveResponse(this.blogService.create(this.blog));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IBlog>>) {
        result.subscribe((res: HttpResponse<IBlog>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
