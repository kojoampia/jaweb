import { OnInit, Component, Input, EventEmitter, Output, TemplateRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
    selector: 'jhi-histogram',
    templateUrl: './histogram.component.html'
})
export class HistogramComponent implements OnInit {
    @Output() dataSelected: EventEmitter<any> = new EventEmitter<any>();
    @Input() view: number[] = [1200, 400];
    @Input() histogramData: HistogramData[];
    @Input() colorScheme = {
        domain: ['#5ADF99', '#E1F7E7', '#A9E8DC', '#02BEC4', '#0284A8', '#2497E8', '#286EFF', '#050C44']
    };
    @Input() schemeType = 'ordinal'; // linear
    @Input() customColors: any[] = [];
    @Input() animations = true;
    @Input() showLegend = true;
    @Input() legendTitle: string;
    @Input() legendPosition = 'right'; // ['right','below']
    @Input() showXAxis = false;
    @Input() showYAxis = false;
    @Input() showGridLines = false;
    @Input() showRoundDomains = false;
    @Input() showXAxisLabel = false;
    @Input() showYAxisLabel = false;
    @Input() xAxisLabel: string;
    @Input() yAxisLabel: string;
    @Input() trimXAxisTicks = false;
    @Input() trimYAxisTicks = false;
    @Input() maxXAxisTickLength = 10;
    @Input() maxYAxisTickLength = 10;
    @Input() xAxisTickFormating: any;
    @Input() yAxisTickFormating: any;
    @Input() xAxisTicks: any[];
    @Input() yAxisTicks: any[];
    @Input() showDataLabel: boolean;
    @Input() gradient = false;
    @Input() activeEntries: object[];
    @Input() barPadding = 5;
    @Input() tooltipDisabled: boolean;
    @Input() tooltipTemplate: TemplateRef<any>;
    @Input() yScaleMax: number;
    @Input() yScaleMin: number;
    @Input() yScale: number;
    @Input() roundEdges: boolean;

    ngOnInit() {
        if (!this.histogramData) {
            this.histogramData = [];
        }
    }

    onSelect(event) {
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
