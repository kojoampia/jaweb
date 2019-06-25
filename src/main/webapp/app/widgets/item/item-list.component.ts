import { Component, Input } from '@angular/core';

export interface ItemModel {
    id: number;
    key: string;
    title: string;
}

@Component({
    selector: 'jhi-list',
    template: './item-list.component.html'
})
export class ItemsListComponent {
    // the array with some items
    @Input() items: ItemModel;

    constructor() {}
}
