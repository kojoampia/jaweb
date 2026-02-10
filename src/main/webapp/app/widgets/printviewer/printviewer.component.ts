import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-printviewer',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './printviewer.component.html',
    styleUrls: ['./printviewer.component.scss']
})
export class PrintViewerComponent {
    @Input() document: PrintDocument = new PrintDocument({});
    documentSource: any;
    isUrl: boolean = false;
    constructor(private activeModal: NgbActiveModal, private sanitizer: DomSanitizer) {}

    close(): void {
        this.activeModal.dismiss('cancel');
    }

    setDocument(document: PrintDocument): void {
        this.document = document;
        const url = document.source.hasOwnProperty('url') ? document.source.url : null;
        this.isUrl = url !== null;
        console.log('isURL: ' + this.isUrl);
        if (this.isUrl) {
            this.documentSource = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        }
        if (!this.isUrl) {
            this.documentSource = document.source;
        }
        console.log(this.documentSource);
    }
    print(): void {
        console.log('#-print-#');
    }

    trackId(index: number, item: any): string | number | undefined {
        return item?.id;
    }

    isFeedback(title: string): boolean {
        const isAFeedback = title.toLowerCase().indexOf('feedback') > -1;
        return isAFeedback;
    }
    translateChoice(choice: any): string {
        const translate = 'cisaSituationRoomApp.FeedbackChoice.' + choice.toString();
        return translate;
    }
}

export class PrintDocument {
    source: any;
    title: string = '';
    created: string = '';
    modified: string = '';
    modifiedBy: string = '';
    constructor(source: any, title?: string, created?: string, modified?: string, modifiedBy?: string) {
        this.source = source;
        this.title = title || '';
        this.created = created || '';
        this.modified = modified || '';
        this.modifiedBy = modifiedBy || '';
    }
}
