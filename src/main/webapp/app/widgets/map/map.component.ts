import { Component, Input } from '@angular/core';

@Component({
    selector: 'jhi-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent {
    public zoom = 17;
    public opacity = 1.0;
    public width = 5;
    @Input() longitude = 6.738169;
    @Input() latitude = 51.450802;

    constructor() {
        console.log('map-component');
    }

    increaseZoom() {
        this.zoom = Math.min(this.zoom + 1, 18);
        console.log('zoom: ', this.zoom);
    }

    decreaseZoom() {
        this.zoom = Math.max(this.zoom - 1, 1);
        console.log('zoom: ', this.zoom);
    }

    increaseOpacity() {
        this.opacity = Math.min(this.opacity + 0.1, 1);
        console.log('opacity: ', this.opacity);
    }

    decreaseOpacity() {
        this.opacity = Math.max(this.opacity - 0.1, 0);
        console.log('opacity: ', this.opacity);
    }
}
