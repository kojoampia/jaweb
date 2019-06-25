import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-infobox',
    templateUrl: './infobox.component.html',
    styleUrls: ['./infobox.component.scss']
})
export class InfoboxComponent implements OnInit {
    @Input() info: Infobox;
    @Output() infoBoxSelected: EventEmitter<Infobox> = new EventEmitter();

    constructor() {}

    ngOnInit() {
        if (!this.info) {
            this.info = new Infobox('0', 'Nothing', 1, 'No content provided.');
        }
        console.log(this.info);
    }
    onInfoboxSelected(infobox: Infobox) {
        this.infoBoxSelected.emit(infobox);
    }
}

export class Infobox {
    id: string;
    title: string;
    type: number;
    url: string;
    content: any;
    link: string;
    linkText: string;
    constructor(id: string, title: string, type?: number, content?: any, url?: string, link?: string, linkText?: string) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.content = content;
        this.url = url;
        this.link = link;
        this.linkText = linkText;
    }
}
