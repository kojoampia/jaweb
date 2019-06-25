import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { DocviewerComponent, ViewerDocument } from './docviewer.component';

@Injectable()
export class DocviewerModalService {
    private isOpen = false;
    private viewerDocument: ViewerDocument;

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
            this.viewerDocument = new ViewerDocument(source, title, created, modified, modifiedBy);
        } else {
            return;
        }
        this.isOpen = true;
        const modalRef = this.modalService.open(DocviewerComponent, {
            container: 'nav',
            size: 'lg'
        });
        modalRef.componentInstance.setDocument(this.viewerDocument);
        modalRef.result.then(
            result => {
                this.isOpen = false;
            },
            reason => {
                this.isOpen = false;
            }
        );
        return modalRef;
    }
}
