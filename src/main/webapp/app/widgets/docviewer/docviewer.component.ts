import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-docviewer',
    templateUrl: './docviewer.component.html',
    styleUrls: ['./docviewer.component.scss']
})
export class DocviewerComponent {
    @Input() document: ViewerDocument;
    documentSource: any;
    constructor(private activeModal: NgbActiveModal, private sanitizer: DomSanitizer) {}

    close() {
        this.activeModal.dismiss('cancel');
    }

    setDocument(document: ViewerDocument) {
        this.document = document;
        this.documentSource = this.sanitizer.bypassSecurityTrustResourceUrl(document.source);
    }
}

export class ViewerDocument {
    source: string;
    title: string;
    created: string;
    modified: string;
    modifiedBy: string;
    constructor(source: string, title?: string, created?: string, modified?: string, modifiedBy?: string) {
        this.source = source;
        this.title = title;
        this.created = created;
        this.modified = modified;
        this.modifiedBy = modifiedBy;
    }
}
