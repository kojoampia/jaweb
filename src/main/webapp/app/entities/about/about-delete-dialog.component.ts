import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManagerService } from 'app/core/services';

import { IAbout } from 'app/shared/model/about.model';
import { AboutService } from './about.service';

@Component({
    selector: 'jhi-about-delete-dialog',
    templateUrl: './about-delete-dialog.component.html',
    standalone: true,
    imports: [CommonModule, RouterModule]
})
export class AboutDeleteDialogComponent {
    about: IAbout;
    
    private aboutService = inject(AboutService);
    public activeModal = inject(NgbActiveModal);
    private eventManager = inject(EventManagerService);

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
    template: '',
    standalone: true,
    imports: [RouterModule]
})
export class AboutDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;
    
    private activatedRoute = inject(ActivatedRoute);
    private router = inject(Router);
    private modalService = inject(NgbModal);

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ about }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AboutDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.about = about;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/about', { outlets: { popup: null } }]);
                        delete this.ngbModalRef;
                    },
                    reason => {
                        this.router.navigate(['/about', { outlets: { popup: null } }]);
                        delete this.ngbModalRef;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        delete this.ngbModalRef;
    }
