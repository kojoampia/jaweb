import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils } from 'ng-jhipster';
import { ISlide, Slide } from 'app/shared/model/slide.model';
import { SlideService } from './slide.service';

@Component({
    selector: 'jhi-slide-update',
    templateUrl: './slide-update.component.html',
    styleUrls: ['../entities.components.scss']
})
export class SlideUpdateComponent implements OnInit {
    @Input() slide: ISlide = new Slide();
    @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
    isSaving = false;
    createdDate = '';
    modifiedDate = '';
    @Input() embed = false;

    constructor(protected dataUtils: JhiDataUtils, protected slideService: SlideService, protected elementRef: ElementRef) {}

    ngOnInit() {
        this.isSaving = false;
        if (this.slide) {
            this.createdDate = this.slide.createdDate != null ? this.slide.createdDate.format(DATE_TIME_FORMAT) : '';
            this.modifiedDate = this.slide.modifiedDate != null ? this.slide.modifiedDate.format(DATE_TIME_FORMAT) : '';
        }
    }

    byteSize(field: any) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType: string, field: any) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event: any, entity: any, field: any, isImage: boolean) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.slide, this.elementRef, field, fieldContentType, idInput);
    }

    clearImage() {
        delete this.slide.url;
    }

    close() {
        delete this.slide;
        this.onClose.emit('close');
    }

    save() {
        this.isSaving = true;
        this.slide.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : undefined;
        this.slide.modifiedDate = this.modifiedDate != null ? moment(this.modifiedDate, DATE_TIME_FORMAT) : undefined;
        if (this.slide.id !== undefined) {
            this.subscribeToSaveResponse(this.slideService.update(this.slide));
        } else {
            this.subscribeToSaveResponse(this.slideService.create(this.slide));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISlide>>) {
        result.subscribe((res: HttpResponse<ISlide>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.close();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
