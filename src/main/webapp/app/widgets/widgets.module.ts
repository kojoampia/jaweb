import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    TinyEditorComponent,
    TileboxComponent,
    InfoboxComponent,
    MapComponent,
    NumCardComponent,
    BubbleMapComponent,
    SidebarComponent,
    PiechartComponent,
    SlidesComponent
} from './index';
import { DocviewerComponent } from './docviewer/docviewer.component';
import { DropDownBoxComponent } from './drop-down-box/ddb.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { HistogramComponent } from './histogram/histogram.component';
import { PrintViewerComponent } from './printviewer/printviewer.component';
import { TreeMapComponent } from './treemap/treemap.component';
import { FormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxCarouselModule } from 'ngx-carousel';
@NgModule({
    imports: [CommonModule, FormsModule, NgbModule, NgxChartsModule, NgxEchartsModule, NgxCarouselModule],
    declarations: [
        TinyEditorComponent,
        TileboxComponent,
        InfoboxComponent,
        MapComponent,
        DocviewerComponent,
        DropDownBoxComponent,
        HeatmapComponent,
        HistogramComponent,
        NumCardComponent,
        PrintViewerComponent,
        TreeMapComponent,
        BubbleMapComponent,
        SidebarComponent,
        PiechartComponent,
        SlidesComponent
    ],
    exports: [
        TinyEditorComponent,
        TileboxComponent,
        InfoboxComponent,
        MapComponent,
        DocviewerComponent,
        DropDownBoxComponent,
        HeatmapComponent,
        HistogramComponent,
        NumCardComponent,
        PrintViewerComponent,
        TreeMapComponent,
        BubbleMapComponent,
        SidebarComponent,
        PiechartComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WidgetsModule {}
