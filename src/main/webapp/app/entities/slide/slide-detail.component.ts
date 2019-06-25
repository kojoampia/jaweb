import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ISlide } from 'app/shared/model/slide.model';

@Component({
    selector: 'jhi-slide-detail',
    templateUrl: './slide-detail.component.html'
})
export class SlideDetailComponent implements OnInit {
    @Input() slide: ISlide;
    @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

    constructor(protected dataUtils: JhiDataUtils) {}

    ngOnInit() {
        console.log(this.slide);
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    close() {
        this.slide = null;
        this.onClose.emit('close');
    }
}
