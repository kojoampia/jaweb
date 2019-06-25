import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'jhi-owl-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss']
})
export class OwlSliderComponent implements OnInit {
    @Input() slides: any[];
    slideOptions = { items: 1, dots: true, nav: true };
    carouselOptions = { items: 3, dots: true, nav: true };
    images: any[];

    constructor() {}

    ngOnInit() {
        console.log('inside owl slider');
        console.log(this.slides);
        if (this.slides && this.slides.length) {
            this.images = [];
            this.slides.forEach(slide => {
                this.images.push(slide.url);
            });
        }
    }

    getStyle(slide: any): string {
        return "background: url('" + slide.url + "') no-repeat scroll center center / 80px 80px";
    }
}
