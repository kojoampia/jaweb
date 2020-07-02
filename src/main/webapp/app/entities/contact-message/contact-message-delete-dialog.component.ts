import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContactMessage } from 'app/shared/model/contact-message.model';
import { ContactMessageService } from './contact-message.service';

@Component({
    selector: 'jhi-contact-message-delete-dialog',
    templateUrl: './contact-message-delete-dialog.component.html'
})
export class ContactMessageDeleteDialogComponent {
    contactMessage: IContactMessage;

    constructor(
        protected contactMessageService: ContactMessageService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.contactMessageService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'contactMessageListModification',
                content: 'Deleted an contactMessage'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-contact-message-delete-popup',
    template: ''
})
export class ContactMessageDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ contactMessage }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ContactMessageDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.contactMessage = contactMessage;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/contact-message', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/contact-message', { outlets: { popup: null } }]);
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
