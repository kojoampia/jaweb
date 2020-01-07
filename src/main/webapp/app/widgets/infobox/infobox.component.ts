import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-infobox',
    templateUrl: './infobox.component.html',
    styleUrls: ['./infobox.component.scss']
})
export class InfoboxComponent implements OnInit {
    @Input() info: Infobox;
    @Output() infoBoxSelected: EventEmitter<Infobox> = new EventEmitter();
    link: string;
    showMore = false;

    constructor() {
        if (!this.info) {
            this.info = new Infobox('0', 'Nothing', 1, 'No content provided.');
        }
        this.link = this.info.link ? '/#/' + this.info.link : '';
        console.log('link: ' + this.link);
    }

    ngOnInit() {
        console.log(this.info);
    }
    onInfoboxSelected(infobox: Infobox) {
        this.infoBoxSelected.emit(infobox);
    }
    toggleShowMore() {
        this.showMore = !this.showMore;
    }
}

export class Infobox {
    id: string;
    title: string;
    type: number;
    brief: string;
    content: any;
    link: string;
    linkText: string;
    constructor(id: string, title: string, type?: number, content?: any, brief?: string, link?: string, linkText?: string) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.content = content;
        this.brief = brief;
        this.link = link;
        this.linkText = linkText;
    }
}
