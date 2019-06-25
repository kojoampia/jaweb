import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAbout } from 'app/shared/model/about.model';
import { AboutService } from './about.service';

@Component({
    selector: 'jhi-about-delete-dialog',
    templateUrl: './about-delete-dialog.component.html'
})
export class AboutDeleteDialogComponent {
    about: IAbout;

    constructor(protected aboutService: AboutService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.aboutService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'aboutListModification',
                content: 'Deleted an about'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-about-delete-popup',
    template: ''
})
export class AboutDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ about }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AboutDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.about = about;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/about', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/about', { outlets: { popup: null } }]);
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
