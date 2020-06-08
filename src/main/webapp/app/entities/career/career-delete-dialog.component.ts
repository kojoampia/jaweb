import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICareer } from 'app/shared/model/career.model';
import { CareerService } from './career.service';

@Component({
    selector: 'jhi-career-delete-dialog',
    templateUrl: './career-delete-dialog.component.html'
})
export class CareerDeleteDialogComponent {
    career: ICareer;

    constructor(protected careerService: CareerService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.careerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'careerListModification',
                content: 'Deleted an career'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-career-delete-popup',
    template: ''
})
export class CareerDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ career }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CareerDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.career = career;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/career', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/career', { outlets: { popup: null } }]);
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
