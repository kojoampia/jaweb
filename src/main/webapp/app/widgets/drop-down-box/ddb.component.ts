import { EventEmitter, Input, Output, OnInit, Component } from '@angular/core';

@Component({
    selector: 'jhi-drop-down-box',
    templateUrl: './ddb.component.html',
    styleUrls: ['./ddb.component.scss']
})
export class DropDownBoxComponent implements OnInit {
    @Input() translateLabel: string;
    @Input() items: any[];
    @Output() itemSelected = new EventEmitter();
    @Input() listItems: any[];
    @Input() selectedItem: any;

    constructor() {
        this.listItems = [];
        this.translateLabel = 'global.field.drop-down-box';
    }

    ngOnInit() {
        this.selectedItem = 'sector';
        if (typeof this.items === 'undefined') {
            this.items = ['sector', 'criticality', 'auditscore', 'iteration', 'name', 'risk'];
        }

        this.items = this.items.sort((a, b) => a.localeCompare(b));

        this.items.forEach(item => {
            this.listItems.push({
                name: item.toUpperCase(),
                value: item.toLowerCase()
            });
        });

        if (typeof this.translateLabel === 'undefined') {
            this.translateLabel = 'global.field.drop-down-box';
        }
    }

    public setItemSelected(item) {
        console.log('broadcast: item-selected');
        console.log(item);
        this.itemSelected.emit(item);
    }
}
