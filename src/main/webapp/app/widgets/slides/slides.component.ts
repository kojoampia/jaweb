import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'jhi-slider',
    standalone: true,
    imports: [CommonModule, NgbModule],
    templateUrl: './slides.component.html',
    styleUrls: ['./slides.component.scss']
})
export class SlidesComponent implements OnDestroy {
    @Input() slides: any[] = [];
    @Input() width: string = '100%';
    @Input() height: string = 'auto';
    @Output() slideSelected: EventEmitter<any> = new EventEmitter<any>();
    constructor() {}

    ngOnDestroy(): void {
        this.slideSelected.complete();
    }

    onClick(item: any): void {
        this.slideSelected.emit(item);
    }

    trackId(index: number, item: any): string | number | undefined {
        return item?.id;
    }
}
