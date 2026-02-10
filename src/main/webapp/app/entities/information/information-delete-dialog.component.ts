import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


import { IInformation } from 'app/shared/model/information.model';
import { InformationService } from './information.service';

@Component({
    selector: 'jhi-information-delete-dialog',
    templateUrl: './information-delete-dialog.component.html'
})
export class InformationDeleteDialogComponent {
    information: IInformation;
    @Output() deletionComplete: EventEmitter<any> = new EventEmitter();

    constructor(
        protected informationService: InformationService,
        public activeModal: NgbActiveModal
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.informationService.delete(id).subscribe(response => {
            this.deletionComplete.emit();
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-information-delete-popup',
    template: ''
})
export class InformationDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ information }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(InformationDeleteDialogComponent, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.information = information;
                this.ngbModalRef.componentInstance.deletionComplete.subscribe(() => {
                    this.router.navigate(['/information', { outlets: { popup: null } }]);
                    this.ngbModalRef = null;
                });
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/information', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/information', { outlets: { popup: null } }]);
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
