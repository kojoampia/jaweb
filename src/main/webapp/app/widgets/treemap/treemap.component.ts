import { OnInit, OnChanges, Component, Input, EventEmitter, Output } from '@angular/core';
@Component({
    selector: 'jhi-treemap',
    templateUrl: './treemap.component.html',
    styleUrls: ['./treemap.component.scss']
})
export class TreeMapComponent implements OnInit {
    @Input() isFiltered = true;
    @Input() data: TreeMap[];
    @Output() dataSelected: EventEmitter<any> = new EventEmitter<any>();
    @Input() colorScheme = {
        domain: ['white', 'yellow', 'orange', 'red']
    };
    @Input() view: any[] = [420, 300];
    @Input() customColors: any[] = [];
    ngOnInit() {}
    onSelect(event: any) {
        console.log('broadcast: on-treemap-select');
        console.log(event);
        this.dataSelected.emit(event);
    }
}
export class TreeMap {
    name: string;
    value: any;
    data: any;
    constructor(name: string, value: number, data?: any) {
        this.name = name;
        this.value = value;
        this.data = data;
    }
}
