import { Component, Input } from '@angular/core';

export interface ItemModel {
    id: number;
    title: string;
}

@Component({
    selector: 'jhi-list-item',
    template: './item.component.html'
})
export class ItemsListItemComponent {
    // expose this variable so a parent component can bind to it and pass data
    @Input() item: ItemModel;

    constructor() {}
}
