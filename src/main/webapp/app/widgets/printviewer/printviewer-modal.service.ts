import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { PrintViewerComponent, PrintDocument } from './printviewer.component';

@Injectable()
export class PrintViewerModalService {
    private isOpen = false;
    private printDocument: PrintDocument;

    constructor(private modalService: NgbModal) {}

    open(document: any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        if (document && document.hasOwnProperty('source')) {
            const source = document.hasOwnProperty('source') ? document.source : null;
            const title = document.hasOwnProperty('title') ? document.title : null;
            const created = document.hasOwnProperty('created') ? document.created : null;
            const modified = document.hasOwnProperty('modified') ? document.modified : null;
            const modifiedBy = document.hasOwnProperty('modifiedBy') ? document.modifiedBy : null;
            this.printDocument = new PrintDocument(source, title, created, modified, modifiedBy);
        } else {
            return;
        }
        this.isOpen = true;
        const modalRef = this.modalService.open(PrintViewerComponent, {
            container: 'nav',
            size: 'lg'
        });
        modalRef.componentInstance.setDocument(this.printDocument);
        modalRef.result.then(
            result => {
                this.isOpen = true;
            },
            reason => {
                console.log(reason);
                this.isOpen = false;
            }
        );
        return modalRef;
    }
}
