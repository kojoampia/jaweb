import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'jhi-docviewer',
    templateUrl: './docviewer.component.html',
    styleUrls: ['./docviewer.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class DocviewerComponent {
    @Input() document: ViewerDocument | null = null;
    documentSource: SafeResourceUrl | null = null;
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
    title?: string;
    created?: string;
    modified?: string;
    modifiedBy?: string;
    constructor(source: string, title?: string, created?: string, modified?: string, modifiedBy?: string) {
        this.source = source;
        this.title = title;
        this.created = created;
        this.modified = modified;
        this.modifiedBy = modifiedBy;
    }
}
