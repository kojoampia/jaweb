import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Slide } from 'app/shared/model/slide.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'jhi-slide-selector',
    templateUrl: './slide-selector.component.html',
    styleUrls: ['./slides.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class SlideSelectorComponent {
    @Input() slides: any[] = [];
    @Output() slideSelected = new EventEmitter<any>();
    constructor() {}

    onClick(item: any) {
        console.log('slide-selected');
        console.log(item);
        this.slideSelected.emit(item);
    }

    trackId(index: number, item: Slide) {
        return item.id;
    }
}
