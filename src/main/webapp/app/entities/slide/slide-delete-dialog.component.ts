import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


import { ISlide } from 'app/shared/model/slide.model';
import { SlideService } from './slide.service';

@Component({
    selector: 'jhi-slide-delete-dialog',
    templateUrl: './slide-delete-dialog.component.html'
})
export class SlideDeleteDialogComponent {
    slide: ISlide;
    @Output() deletionComplete: EventEmitter<any> = new EventEmitter();

    constructor(protected slideService: SlideService, public activeModal: NgbActiveModal) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.slideService.delete(id).subscribe(response => {
            this.deletionComplete.emit();
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-slide-delete-popup',
    template: ''
})
export class SlideDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ slide }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SlideDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.slide = slide;
                this.ngbModalRef.componentInstance.deletionComplete.subscribe(() => {
                    this.router.navigate(['/slide', { outlets: { popup: null } }]);
                    this.ngbModalRef = null;
                });
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/slide', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/slide', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
