import { Component, Input } from '@angular/core';

@Component({
    selector: 'jhi-gmap',
    templateUrl: './gmap.component.html',
    styleUrls: ['./gmap.component.scss']
})
export class GMapComponent {
    @Input() title = 'Google Map';
    @Input() lat = 51.4255824; // Latitude
    @Input() lng = 6.7891669; // Longitude
    @Input() zoom = 17;
}
