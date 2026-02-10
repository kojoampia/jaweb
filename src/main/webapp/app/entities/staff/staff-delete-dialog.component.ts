import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, EventWithContent } from 'app/core/services/event-manager.service';

import { IStaff } from 'app/shared/model/staff.model';
import { StaffService } from './staff.service';

@Component({
    selector: 'jhi-staff-delete-dialog',
    templateUrl: './staff-delete-dialog.component.html'
})
export class StaffDeleteDialogComponent {
    staff: IStaff;

    constructor(protected staffService: StaffService, public activeModal: NgbActiveModal, protected eventManager: EventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.staffService.delete(id).subscribe(response => {
            this.eventManager.broadcast(new EventWithContent('staffListModification', 'Deleted an staff'));
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-staff-delete-popup',
    template: ''
})
export class StaffDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef | null = null;

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
        if (this.ngbModalRef) {
            this.ngbModalRef.close();
        }
    }
}
