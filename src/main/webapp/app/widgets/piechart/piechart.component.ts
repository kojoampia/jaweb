import { OnInit, Component, Input, EventEmitter, Output } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
    selector: 'jhi-piechart',
    templateUrl: './piechart.component.html',
    styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit {
    @Output() dataSelected: EventEmitter<any> = new EventEmitter<any>();
    @Input() pieData: Piechart[];
    @Input() view: number[] = [450, 450];
    @Input() colorScheme = { domain: ['green', 'yellow', 'orange', 'red'] };
    @Input() customColors: any[] = [];
    @Input() showLegend = true;
    @Input() showLabels = false;
    @Input() doughnut = true;
    @Input() explodeSlices = true;
    @Input() gradient = false;
    @Input() activeEntries: any[] = [];

    constructor() {
        this.pieData = [];
    }
    ngOnInit() {
        if (typeof this.pieData === 'undefined') {
            this.pieData = [];
        }
    }

    onSelect(event) {
        console.log('listen: on-treemap-select');
        console.log(event);
        this.dataSelected.emit(event);
    }
}

export class Piechart {
    name?: string;
    value?: number;
    constructor(name?: string, value?: number) {
        this.name = name;
        this.value = value;
    }
}
