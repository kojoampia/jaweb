import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { IHome } from 'app/shared/model/home.model';
import { ISlide } from 'app/shared/model/slide.model';
import { IInformation } from 'app/shared/model/information.model';
import { AlertErrorComponent } from 'app/shared/alert/alert-error.component';
import { Infobox, InfoboxComponent } from 'app/widgets/infobox/infobox.component';
import { SlidesComponent } from 'app/widgets/slides/slides.component';

@Component({
    selector: 'jhi-home-detail',
    templateUrl: './home-detail.component.html',
    standalone: true,
    imports: [CommonModule, AlertErrorComponent, InfoboxComponent, SlidesComponent, FontAwesomeModule, RouterModule, DatePipe]
})
export class HomeDetailComponent implements OnInit {
    home: IHome | null = null;
    infoboxInfo: Infobox | null = null;
    slidesData: ISlide[] | any[] | null = null;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ home }) => {
            this.home = home;
            if (this.home?.information) {
                this.infoboxInfo = this.convertInformationToInfobox(this.home.information);
            }
            if (this.home?.slides) {
                this.slidesData = this.home.slides;
            }
        });
    }

    convertInformationToInfobox(info: IInformation): Infobox {
        return new Infobox(
            info.id ? info.id.toString() : '0',
            info.name || 'No Title',
            0, // Default type, adjust if IInformation has a corresponding property
            info.content || '',
            info.brief || ''
        );
    }

    previousState() {
        window.history.back();
    }
}
