import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


import { IHome } from 'app/shared/model/home.model';
import { HomeService } from './home.service';

@Component({
    selector: 'jhi-home-delete-dialog',
    templateUrl: './home-delete-dialog.component.html'
})
export class HomeDeleteDialogComponent {
    home: IHome;
    @Output() deletionComplete: EventEmitter<any> = new EventEmitter();

    constructor(protected homeService: HomeService, public activeModal: NgbActiveModal) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.homeService.delete(id).subscribe(response => {
            this.deletionComplete.emit();
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-home-delete-popup',
    template: ''
})
export class HomeDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ home }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HomeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.home = home;
                this.ngbModalRef.componentInstance.deletionComplete.subscribe(() => {
                    this.router.navigate(['/home', { outlets: { popup: null } }]);
                    this.ngbModalRef = null;
                });
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/home', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/home', { outlets: { popup: null } }]);
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
