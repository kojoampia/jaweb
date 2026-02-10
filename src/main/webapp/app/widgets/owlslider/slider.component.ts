import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'jhi-owl-slider',
    standalone: true,
    imports: [CommonModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss']
})
export class OwlSliderComponent implements OnInit {
    @Input() slides: any[] = [];
    slideOptions: any = { items: 1, dots: true, nav: true };
    carouselOptions: any = { items: 3, dots: true, nav: true };
    images: any[] = [];

    constructor() {}

    ngOnInit(): void {
        console.log('inside owl slider');
        console.log(this.slides);
        if (this.slides && this.slides.length > 0) {
            this.images = [];
            this.slides.forEach((slide: any) => {
                this.images.push(slide.url);
            });
        }
    }

    getStyle(slide: any): string {
        return "background: url('" + slide.url + "') no-repeat scroll center center / 80px 80px";
    }
}
