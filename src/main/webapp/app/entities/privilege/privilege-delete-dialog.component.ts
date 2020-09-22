import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPrivilege } from 'app/shared/model/privilege.model';
import { PrivilegeService } from './privilege.service';

@Component({
    selector: 'jhi-privilege-delete-dialog',
    templateUrl: './privilege-delete-dialog.component.html'
})
export class PrivilegeDeleteDialogComponent {
    privilege: IPrivilege;

    constructor(
        protected privilegeService: PrivilegeService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.privilegeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'privilegeListModification',
                content: 'Deleted an privilege'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-privilege-delete-popup',
    template: ''
})
export class PrivilegeDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ privilege }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PrivilegeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.privilege = privilege;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/privilege', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/privilege', { outlets: { popup: null } }]);
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
