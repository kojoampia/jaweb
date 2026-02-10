import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactMessageDeleteDialogComponent } from 'app/entities/contact';

@Component({
    selector: 'jhi-floatbox',
    templateUrl: './floatbox.component.html',
    styles: []
})
export class FloatboxComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}

@Component({
    selector: 'jhi-floatbox-popup',
    template: ''
})
export class FloatboxPopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef | null = null;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ contactMessage }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ContactMessageDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                if (this.ngbModalRef) {
                    this.ngbModalRef.componentInstance.contactMessage = contactMessage;
                    this.ngbModalRef.result.then(
                        result => {
                            this.router.navigate(['/contact/messages', { outlets: { popup: null } }]);
                            this.ngbModalRef = null;
                        },
                        reason => {
                            this.router.navigate(['/contact/messages', { outlets: { popup: null } }]);
                            this.ngbModalRef = null;
                        }
                    );
                }
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
