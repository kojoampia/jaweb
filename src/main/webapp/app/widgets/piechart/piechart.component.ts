import { OnInit, Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
    selector: 'jhi-piechart',
    templateUrl: './piechart.component.html',
    styleUrls: ['./piechart.component.scss'],
    standalone: true,
    imports: [CommonModule, NgxChartsModule]
})
export class PiechartComponent implements OnInit {
    @Output() dataSelected: EventEmitter<any> = new EventEmitter<any>();
    @Input() pieData: Piechart[] = [];
    @Input() view: [number, number] = [450, 450];
    @Input() colorScheme: any = { domain: ['green', 'yellow', 'orange', 'red'] };
    @Input() customColors: any[] = [];
    @Input() showLegend = true;
    @Input() showLabels = false;
    @Input() doughnut = true;
    @Input() explodeSlices = true;
    @Input() gradient = false;
    @Input() activeEntries: any[] = [];

    ngOnInit() {
        if (typeof this.pieData === 'undefined') {
            this.pieData = [];
        }
    }

    onSelect(event: any) {
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
