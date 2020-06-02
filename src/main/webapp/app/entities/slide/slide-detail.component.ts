import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ISlide, Slide } from 'app/shared/model/slide.model';

@Component({
    selector: 'jhi-slide-detail',
    templateUrl: './slide-detail.component.html',
    styleUrls: ['../entities.components.scss']
})
export class SlideDetailComponent implements OnInit {
    @Input() slide: ISlide = new Slide();
    @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

    constructor(protected dataUtils: JhiDataUtils) {
        delete this.slide;
    }

    ngOnInit() {
        console.log(this.slide);
    }

    byteSize(field: any) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType: string, field: any) {
        return this.dataUtils.openFile(contentType, field);
    }
    close() {
        delete this.slide;
        this.onClose.emit('close');
    }
}
