import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'jhi-gmap',
    standalone: true,
    imports: [CommonModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './gmap.component.html',
    styleUrls: ['./gmap.component.scss']
})
export class GMapComponent {
    @Input() title = 'Google Map';
    @Input() lat = 51.4255824; // Latitude
    @Input() lng = 6.7891669; // Longitude
    @Input() zoom = 17;
}
