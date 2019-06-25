import { Component } from '@angular/core';
import moment = require('moment');
import { DATE_FORMAT } from 'app/shared';

@Component({
    selector: 'jhi-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
    footerDate = moment(new Date(), DATE_FORMAT).utc(true);
    constructor() {
        console.log(this.footerDate);
    }
}
