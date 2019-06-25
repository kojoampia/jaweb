import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ISlide } from 'app/shared/model/slide.model';
import { Tile } from 'app/widgets';

@Component({
    selector: 'jhi-slide-list',
    templateUrl: './slide-list.component.html',
    styleUrls: ['../entities.components.scss']
})
export class SlideListComponent implements OnInit {
    @Input() slides: ISlide[];
    @Output() slideSelected: EventEmitter<any> = new EventEmitter<any>();
    tiles: Tile[] = [];
    title = 'Slide management';
    constructor() {}
    ngOnInit() {
        console.log('slide-list component');
        if (this.slides) {
            this.tiles = [];
            this.slides.forEach(slide => {
                this.tiles.push(new Tile(slide.id, slide.title, slide.description, slide.url, false));
            });
        }
    }
    onTileSelected(tile: Tile) {
        const slide = this.findSlideById(tile.id);
        this.slideSelected.emit({selected: tile.selected, value: slide});
    }
    private findSlideById(id: string): ISlide {
        return this.slides.find(element => element.id === id);
    }
}
