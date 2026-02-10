import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


import { IContact, Contact } from 'app/shared/model/contact.model';
import { ContactService } from './contact.service';

@Component({
    selector: 'jhi-contact-delete-dialog',
    templateUrl: './contact-delete-dialog.component.html',
    styleUrls: ['../entities.components.scss']
})
export class ContactDeleteDialogComponent {
    contact: IContact = new Contact();
    @Output() deletionComplete: EventEmitter<any> = new EventEmitter();

    constructor(protected contactService: ContactService, public activeModal: NgbActiveModal) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.contactService.delete(id).subscribe(response => {
            this.deletionComplete.emit();
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-contact-delete-popup',
    template: ''
})
export class ContactDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef | null;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {
    }

    ngOnInit() {
        if (!this.ngbModalRef) {
            this.init();
        }
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }

    protected init() {
        this.activatedRoute.data.subscribe(({ contact }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ContactDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.contact = contact;
                this.ngbModalRef.componentInstance.deletionComplete.subscribe(() => {
                    this.router.navigate(['/contact', { outlets: { popup: null } }]);
                    this.ngbModalRef = null;
                });
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/contact', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/contact', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }
}
