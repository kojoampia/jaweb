import { OnInit, Component, Input, EventEmitter, Output, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
    selector: 'jhi-numcard',
    standalone: true,
    imports: [CommonModule, NgxChartsModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './numcard.component.html',
    styleUrls: ['./numcard.component.scss']
})
export class NumCardComponent implements OnInit {
    @Output() dataSelected: EventEmitter<any> = new EventEmitter<any>();
    @Input() cardData: CardData[] = [];
    @Input() view: [number, number] = [900, 400];
    @Input() colorScheme: any = {
        domain: ['white', 'yellow', 'orange', 'red']
    };
    @Input() customColors: any[] = [];

    constructor() {
        this.cardData = [];
    }
    ngOnInit() {}

    onSelect(event: any) {
        console.log('listen: on-number-card-select');
        console.log(event);
        this.dataSelected.emit(event);
    }
}

export class CardData {
    name: string;
    value: number;
    data: any;
    constructor(name: string, value: number, data?: any) {
        this.name = name;
        this.value = value;
        this.data = data;
    }
}
