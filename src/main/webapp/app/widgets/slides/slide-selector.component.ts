import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Slide } from 'app/shared/model/slide.model';

@Component({
    selector: 'jhi-slide-selector',
    templateUrl: './slide-selector.component.html',
    styleUrls: ['./slides.component.scss']
})
export class SlideSelectorComponent implements OnDestroy {
    @Input() slides: any[] = [];
    @Output() slideSelected = new EventEmitter<any>();
    constructor() {}

    ngOnDestroy() {
        this.slideSelected = null;
    }

    onClick(item: any) {
        this.slideSelected.emit(item);
    }

    trackId(index: number, item: Slide) {
        return item.id;
    }
}
