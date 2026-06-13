import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JhiIconComponent } from 'app/shared/icon/icon.component';

@Component({
    selector: 'jhi-infobox',
    standalone: true,
    imports: [CommonModule, JhiIconComponent],
    templateUrl: './infobox.component.html',
    styleUrls: ['./infobox.component.scss']
})
export class InfoboxComponent implements OnInit {
    @Input() info: Infobox = new Infobox('0', 'Nothing', 1, 'No content provided.');
    @Output() infoBoxSelected: EventEmitter<Infobox> = new EventEmitter();
    link: string = '';
    showMore = false;

    constructor() {
        this.link = this.info.link ? '/#/' + this.info.link : '';
        console.log('link: ' + this.link);
    }

    ngOnInit(): void {
        console.log(this.info);
    }
    onInfoboxSelected(infobox: Infobox): void {
        this.infoBoxSelected.emit(infobox);
    }
    toggleShowMore(): void {
        this.showMore = !this.showMore;
    }
}

export class Infobox {
    id: string;
    title: string;
    type: number = 0;
    brief: string = '';
    content: any;
    link: string = '';
    linkText: string = '';
    constructor(id: string, title: string, type?: number, content?: any, brief?: string, link?: string, linkText?: string) {
        this.id = id;
        this.title = title;
        this.type = type || 0;
        this.content = content;
        this.brief = brief || '';
        this.link = link || '';
        this.linkText = linkText || '';
    }
}
