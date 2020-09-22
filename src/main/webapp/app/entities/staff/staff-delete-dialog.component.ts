import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStaff } from 'app/shared/model/staff.model';
import { StaffService } from './staff.service';

@Component({
    selector: 'jhi-staff-delete-dialog',
    templateUrl: './staff-delete-dialog.component.html'
})
export class StaffDeleteDialogComponent {
    staff: IStaff;

    constructor(protected staffService: StaffService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.staffService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'staffListModification',
                content: 'Deleted an staff'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-staff-delete-popup',
    template: ''
})
export class StaffDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ staff }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(StaffDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.staff = staff;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/staff', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/staff', { outlets: { popup: null } }]);
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
