import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


import { IPortfolio } from 'app/shared/model/portfolio.model';
import { PortfolioService } from './portfolio.service';

@Component({
    selector: 'jhi-portfolio-delete-dialog',
    templateUrl: './portfolio-delete-dialog.component.html',
    styleUrls: ['../entities.components.scss']
})
export class PortfolioDeleteDialogComponent {
    portfolio: IPortfolio;
    @Output() deletionComplete: EventEmitter<any> = new EventEmitter();

    constructor(
        protected portfolioService: PortfolioService,
        public activeModal: NgbActiveModal
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.portfolioService.delete(id).subscribe(response => {
            this.deletionComplete.emit();
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-portfolio-delete-popup',
    template: ''
})
export class PortfolioDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ portfolio }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PortfolioDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.portfolio = portfolio;
                this.ngbModalRef.componentInstance.deletionComplete.subscribe(() => {
                    this.router.navigate(['/portfolio', { outlets: { popup: null } }]);
                    this.ngbModalRef = null;
                });
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/portfolio', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/portfolio', { outlets: { popup: null } }]);
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
