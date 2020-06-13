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
    SlidesComponent,
    SlideSelectorComponent,
    PageEditorComponent,
    PageViewerComponent
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
import { NgxTinymceModule } from 'ngx-tinymce';
import { GMapComponent } from './gmap/gmap.component';
import { OwlSliderComponent } from './owlslider/slider.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NgxChartsModule,
        NgxEchartsModule,
        NgxCarouselModule,
        NgxTinymceModule.forRoot({
            baseURL: '/content/tinymce-4.9.0/'
        })
    ],
    declarations: [
        TinyEditorComponent,
        TileboxComponent,
        InfoboxComponent,
        DocviewerComponent,
        DropDownBoxComponent,
        HeatmapComponent,
        HistogramComponent,
        NumCardComponent,
        PrintViewerComponent,
        TreeMapComponent,
        BubbleMapComponent,
        GMapComponent,
        MapComponent,
        OwlSliderComponent,
        SidebarComponent,
        PiechartComponent,
        SlidesComponent,
        SlideSelectorComponent,
        PageEditorComponent,
        PageViewerComponent
    ],
    exports: [
        TinyEditorComponent,
        TileboxComponent,
        InfoboxComponent,
        MapComponent,
        GMapComponent,
        OwlSliderComponent,
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
        SlidesComponent,
        SlideSelectorComponent,
        PageEditorComponent,
        PageViewerComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WidgetsModule {}
