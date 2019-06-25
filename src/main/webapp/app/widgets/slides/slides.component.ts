import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
    selector: 'jhi-slider',
    templateUrl: './slides.component.html',
    styleUrls: ['./slides.component.scss']
})
export class SlidesComponent implements OnDestroy {
    @Input() slides: any[] = [];
    @Output() slideSelected = new EventEmitter<any>();
    constructor() {}

    ngOnDestroy() {
        this.slideSelected = null;
    }

    onClick(item: any) {
        this.slideSelected.emit(item);
    }
}
