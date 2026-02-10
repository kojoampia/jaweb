import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { IInformation } from 'app/shared/model/information.model';
import { Infobox, InfoboxComponent } from 'app/widgets/infobox/infobox.component';

@Component({
    selector: 'jhi-information-detail',
    templateUrl: './information-detail.component.html',
    styleUrls: ['../entities.components.scss'],
    standalone: true,
    imports: [CommonModule, InfoboxComponent, FontAwesomeModule, RouterModule]
})
export class InformationDetailComponent implements OnInit {
    info: IInformation | null = null;
    infoboxData: Infobox | null = null;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ information }) => {
            this.info = information;
            if (this.info) {
                this.infoboxData = this.convertInformationToInfobox(this.info);
            }
        });
    }

    convertInformationToInfobox(info: IInformation): Infobox {
        return new Infobox(
            info.id ? info.id.toString() : '0',
            info.title || 'No Title',
            0, // Default type, adjust if IInformation has a corresponding property
            info.content || '',
            info.brief || ''
        );
    }

    previousState() {
        window.history.back();
    }
}
