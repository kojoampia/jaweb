import { EventEmitter, Input, Output, OnInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'jhi-drop-down-box',
    templateUrl: './ddb.component.html',
    styleUrls: ['./ddb.component.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule]
})
export class DropDownBoxComponent implements OnInit {
    @Input() translateLabel = 'global.field.drop-down-box';
    @Input() items: any[] = [];
    @Output() itemSelected = new EventEmitter();
    @Input() listItems: any[] = [];
    @Input() selectedItem: any;

    constructor() {}

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

    public setItemSelected(item: any) {
        console.log('broadcast: item-selected');
        console.log(item);
        this.itemSelected.emit(item);
    }
}
