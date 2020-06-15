import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared';
import { SessionStorage } from 'ngx-webstorage';

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
