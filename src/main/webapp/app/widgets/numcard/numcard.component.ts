import { OnInit, Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'jhi-numcard',
    templateUrl: './numcard.component.html',
    styleUrls: ['./numcard.component.scss']
})
export class NumCardComponent implements OnInit {
    @Output() dataSelected: EventEmitter<any> = new EventEmitter<any>();
    @Input() cardData: CardData[];
    @Input() view: number[] = [900, 400];
    @Input() colorScheme = {
        domain: ['white', 'yellow', 'orange', 'red']
    };
    @Input() customColors: any[] = [];

    constructor() {
        this.cardData = [];
    }
    ngOnInit() {}

    onSelect(event) {
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
