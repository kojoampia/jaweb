import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, EventWithContent } from 'app/core/services/event-manager.service';

import { IImprint } from 'app/shared/model/imprint.model';
import { ImprintService } from './imprint.service';

@Component({
    selector: 'jhi-imprint-delete-dialog',
    templateUrl: './imprint-delete-dialog.component.html'
})
export class ImprintDeleteDialogComponent {
    imprint: IImprint;

    constructor(protected imprintService: ImprintService, public activeModal: NgbActiveModal, protected eventManager: EventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.imprintService.delete(id).subscribe(response => {
            this.eventManager.broadcast(new EventWithContent('imprintListModification', 'Deleted an imprint'));
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-imprint-delete-popup',
    template: ''
})
export class ImprintDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef | null = null;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ imprint }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ImprintDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.imprint = imprint;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/imprint', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/imprint', { outlets: { popup: null } }]);
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
