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
    PageViewerComponent,
    StickyHeaderDirective
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
import { ConsoleLoggerService } from 'app/console-logger.service';
import { LoaderComponent } from './loading/loader.component';
import { MessengerComponent } from './messenger/messenger.component';
import { FloatboxComponent, FloatboxPopupComponent } from './floatbox/floatbox.component';
import { InfoViewComponent } from './infoview/info-view.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NgxChartsModule,
        NgxEchartsModule,
        NgxCarouselModule,
        NgxTinymceModule.forRoot({
            baseURL: '/tinymce/'
        })
    ],
    declarations: [
        TinyEditorComponent,
        TileboxComponent,
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
        PageEditorComponent,
        PageViewerComponent,
        LoaderComponent,
        MessengerComponent,
        FloatboxComponent,
        FloatboxPopupComponent,
        InfoViewComponent,
        StickyHeaderDirective
    ],
    exports: [
        TinyEditorComponent,
        TileboxComponent,
        MapComponent,
        GMapComponent,
        OwlSliderComponent,
        HeatmapComponent,
        HistogramComponent,
        NumCardComponent,
        PrintViewerComponent,
        TreeMapComponent,
        BubbleMapComponent,
        SidebarComponent,
        PiechartComponent,
        PageEditorComponent,
        PageViewerComponent,
        LoaderComponent,
        MessengerComponent,
        FloatboxPopupComponent
    ],
    providers: [ConsoleLoggerService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WidgetsModule {}
