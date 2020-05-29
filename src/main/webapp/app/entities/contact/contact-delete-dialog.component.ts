import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContact, Contact } from 'app/shared/model/contact.model';
import { ContactService } from './contact.service';

@Component({
    selector: 'jhi-contact-delete-dialog',
    templateUrl: './contact-delete-dialog.component.html'
})
export class ContactDeleteDialogComponent {
    protected contact: IContact = new Contact();

    constructor(protected contactService: ContactService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.contactService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'contactListModification',
                content: 'Deleted an contact'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-contact-delete-popup',
    template: ''
})
export class ContactDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {
        this.ngbModalRef = modalService.open(null);
        delete this.ngbModalRef;
    }

    ngOnInit() {
        if (!this.ngbModalRef) {
            this.init();
        }
    }

    ngOnDestroy() {
        delete this.ngbModalRef;
    }

    protected init() {
        this.activatedRoute.data.subscribe(({ contact }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ContactDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.contact = contact;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/contact', { outlets: { popup: null } }]);
                        delete this.ngbModalRef;
                    },
                    reason => {
                        this.router.navigate(['/contact', { outlets: { popup: null } }]);
                        delete this.ngbModalRef;
                    }
                );
            }, 0);
        });
    }
}
