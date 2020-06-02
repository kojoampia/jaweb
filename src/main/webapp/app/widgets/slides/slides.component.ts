import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Slide } from 'app/shared/model/slide.model';

@Component({
    selector: 'jhi-slider',
    templateUrl: './slides.component.html',
    styleUrls: ['./slides.component.scss']
})
export class SlidesComponent implements OnDestroy {
    @Input() slides: any[] = [];
    @Input() width = 800;
    @Input() height = 400;
    @Output() slideSelected = new EventEmitter<any>();
    constructor() {}

    ngOnDestroy() {
        delete this.slideSelected;
    }

    onClick(item: any) {
        this.slideSelected.emit(item);
    }

    trackId(index: number, item: Slide) {
        return item.id;
    }
}
