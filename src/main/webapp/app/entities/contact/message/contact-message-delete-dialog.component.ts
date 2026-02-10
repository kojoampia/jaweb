import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


import { IContactMessage } from 'app/shared/model/contact-message.model';
import { ContactService } from '../contact.service';

@Component({
    selector: 'jhi-contact-message-delete-dialog',
    templateUrl: './contact-message-delete-dialog.component.html'
})
export class ContactMessageDeleteDialogComponent {
    contactMessage: IContactMessage;
    @Output() deletionComplete: EventEmitter<any> = new EventEmitter();

    constructor(
        protected contactMessageService: ContactService,
        public activeModal: NgbActiveModal
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.contactMessageService.deleteMessage(id).subscribe(response => {
            this.deletionComplete.emit();
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
                this.ngbModalRef = this.modalService.open(ContactMessageDeleteDialogComponent, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.contactMessage = contactMessage;
                this.ngbModalRef.componentInstance.deletionComplete.subscribe(() => {
                    this.router.navigate(['/contact-message', { outlets: { popup: null } }]);
                    this.ngbModalRef = null;
                });
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
