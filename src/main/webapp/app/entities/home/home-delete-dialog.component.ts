import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHome } from 'app/shared/model/home.model';
import { HomeService } from './home.service';

@Component({
    selector: 'jhi-home-delete-dialog',
    templateUrl: './home-delete-dialog.component.html'
})
export class HomeDeleteDialogComponent {
    home: IHome;

    constructor(protected homeService: HomeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.homeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'homeListModification',
                content: 'Deleted an home'
            });
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
                this.ngbModalRef = this.modalService.open(HomeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.home = home;
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
