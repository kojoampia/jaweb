import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ISlide, Slide } from 'app/shared/model/slide.model';
import { Tile } from 'app/widgets';

@Component({
    selector: 'jhi-slide-view',
    templateUrl: './slide-view.component.html',
    styleUrls: ['../entities.components.scss']
})
export class SlideViewComponent implements OnInit {
    @Input() slides: ISlide[] = [];
    @Output() slideSelected: EventEmitter<any> = new EventEmitter<any>();
    tiles: Tile[] = [];
    title = 'Slide management';
    constructor() {}
    ngOnInit() {
        console.log('slide-list component');
        if (this.slides) {
            this.tiles = [];
            this.slides.forEach(slide => {
                this.tiles.push(
                    new Tile(slide.id as string, slide.title as string, slide.description as string, slide.url as string, false)
                );
            });
        }
    }
    onTileSelected(tile: Tile) {
        const slide = this.findSlideById(tile.id);
        this.slideSelected.emit({ selected: tile.selected, value: slide });
    }
    private findSlideById(id: string): ISlide {
        return this.slides.find(element => element.id === id) || new Slide();
    }
}
