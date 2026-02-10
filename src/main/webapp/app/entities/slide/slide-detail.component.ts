import { Component, OnInit, Input, Output, EventEmitter, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ISlide, Slide } from 'app/shared/model/slide.model';
import { DataUtils } from 'app/core/services/data-utils.service';

@Component({
    selector: 'jhi-slide-detail',
    templateUrl: './slide-detail.component.html',
    styleUrls: ['../entities.components.scss'],
    standalone: true,
    imports: [CommonModule, RouterModule]
})
export class SlideDetailComponent implements OnInit {
    @Input() slide: ISlide = new Slide();
    @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
    
    private dataUtils = inject(DataUtils);

    ngOnInit() {
        console.log(this.slide);
    }

    byteSize(field: any) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType: string, field: any) {
        return this.dataUtils.openFile(contentType, field);
    }
    
    close() {
        delete this.slide;
        this.onClose.emit('close');
    }
}
