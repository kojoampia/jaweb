import { OnInit, Component, Input, EventEmitter, Output, TemplateRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
    selector: 'jhi-histogram',
    standalone: true,
    imports: [CommonModule, NgxChartsModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './histogram.component.html'
})
export class HistogramComponent implements OnInit {
    @Output() dataSelected: EventEmitter<any> = new EventEmitter<any>();
    @Input() view: [number, number] = [1200, 400];
    @Input() histogramData: HistogramData[] = [];
    @Input() colorScheme: any = {
        domain: ['#5ADF99', '#E1F7E7', '#A9E8DC', '#02BEC4', '#0284A8', '#2497E8', '#286EFF', '#050C44']
    };
    @Input() schemeType = 'ordinal'; // linear
    @Input() customColors: any[] = [];
    @Input() animations = true;
    @Input() showLegend = true;
    @Input() legendTitle: string = '';
    @Input() legendPosition: any = 'right'; // ['right','below']
    @Input() showXAxis = false;
    @Input() showYAxis = false;
    @Input() showGridLines = false;
    @Input() showRoundDomains = false;
    @Input() showXAxisLabel = false;
    @Input() showYAxisLabel = false;
    @Input() xAxisLabel: string = '';
    @Input() yAxisLabel: string = '';
    @Input() trimXAxisTicks = false;
    @Input() trimYAxisTicks = false;
    @Input() maxXAxisTickLength = 10;
    @Input() maxYAxisTickLength = 10;
    @Input() xAxisTickFormating: any = null;
    @Input() yAxisTickFormating: any = null;
    @Input() xAxisTicks: any[] = [];
    @Input() yAxisTicks: any[] = [];
    @Input() showDataLabel: boolean = false;
    @Input() gradient = false;
    @Input() activeEntries: object[] = [];
    @Input() barPadding = 5;
    @Input() tooltipDisabled: boolean = false;
    @Input() tooltipTemplate: TemplateRef<any> | null = null;
    @Input() yScaleMax: number | null = null;
    @Input() yScaleMin: number | null = null;
    @Input() yScale: number | null = null;
    @Input() roundEdges: boolean = false;

    ngOnInit() {
        if (!this.histogramData) {
            this.histogramData = [];
        }
    }

    onSelect(event: any): void {
        console.log('listen: on-histogram-select');
        console.log(event);
        this.dataSelected.emit(event);
    }
}

export class HistogramData {
    name?: string;
    value?: number;
    data?: any;
    constructor(name?: string, value?: number, data?: any) {
        this.name = name;
        this.value = value;
        this.data = data;
    }
}
/** series is a list of name:value pairs eg. series:[ {name: banks, value: 3}, {name: transport: value: 26} ] */
