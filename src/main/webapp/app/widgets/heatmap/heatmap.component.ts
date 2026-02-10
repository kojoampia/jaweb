import { OnInit, Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
    selector: 'jhi-heatmap',
    standalone: true,
    imports: [CommonModule, NgxChartsModule],
    templateUrl: './heatmap.component.html'
})
export class HeatmapComponent implements OnInit {
    @Output() dataSelected: EventEmitter<any> = new EventEmitter<any>();
    @Input() heatmapData: HeatmapData[] = [];
    @Input() view: [number, number] = [880, 300];
    @Input() showXAxis: boolean = false;
    @Input() showYAxis: boolean = false;
    @Input() gradient: boolean = false;
    @Input() showLegend: boolean = false;
    @Input() showXAxisLabel: boolean = false;
    @Input() xAxisLabel: string = '';
    @Input() showYAxisLabel: boolean = false;
    @Input() yAxisLabel: string = '';
    @Input() colorScheme: any = {
        domain: ['#E1F7E7', '#A9E8DC', '#02BEC4', '#0284A8', '#050C42']
    };
    @Input() customColors: any[] = [];

    constructor() {}

    ngOnInit(): void {
        if (typeof this.heatmapData === 'undefined' || !this.heatmapData) {
            this.heatmapData = [];
        }
    }

    onSelect(event: any): void {
        console.log('listen: on-heatmap-select');
        console.log(event);
        this.dataSelected.emit(event);
    }
}

export class HeatmapData {
    name?: string;
    series?: any[];

    constructor(name?: string, series?: any[]) {
        this.name = name;
        this.series = series;
    }
}
