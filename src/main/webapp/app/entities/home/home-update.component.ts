import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IHome } from 'app/shared/model/home.model';
import { HomeService } from './home.service';
import { IInformation } from 'app/shared/model/information.model';
import { InformationService } from 'app/entities/information';
import { ISlide } from 'app/shared/model/slide.model';
import { SlideService } from '../slide';
import { IPortfolio } from 'app/shared/model/portfolio.model';
import { IService } from 'app/shared/model/service.model';
import { IPartner } from 'app/shared/model/partner.model';
import { PortfolioService } from '../portfolio';
import { PartnerService } from '../partner';
import { ServiceService } from '../service';

@Component({
    selector: 'jhi-home-update',
    templateUrl: './home-update.component.html',
    styleUrls: ['../entities.components.scss']
})
export class HomeUpdateComponent implements OnInit {
    home: IHome;
    isSaving: boolean;
    info: IInformation;
    information: any[];
    createdDate: string;
    modifiedDate: string;

    slides: ISlide[];
    portfolios: IPortfolio[];
    services: IService[];
    partners: IPartner[];

    error: any;
    success: any;

    slideWidth = 600;
    slideHeight = 300;

    constructor(
        protected slideService: SlideService,
        protected portfolioService: PortfolioService,
        protected partnerService: PartnerService,
        protected servicesService: ServiceService,
        protected jhiAlertService: JhiAlertService,
        protected homeService: HomeService,
        protected informationService: InformationService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ home }) => {
            this.home = home;
            this.createdDate = this.home.createdDate != null ? this.home.createdDate.format(DATE_TIME_FORMAT) : null;
            this.modifiedDate = this.home.modifiedDate != null ? this.home.modifiedDate.format(DATE_TIME_FORMAT) : null;
        });
            this.loadInformation();
            this.loadSlides();
    }

    loadSlides() {
        this.slideService
        .query()
        .subscribe(
            (res: HttpResponse<ISlide[]>) => {
                this.slides = res.body;
                console.log('load-slides');
                console.log(this.slides);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    loadInformation() {
        this.informationService.query().subscribe(res => {
            const data = res.body;
            this.information = [];
            data.forEach(item => {
                this.information.push({selected: false, info: item});
            });
            console.log('load-information');
            console.log(this.information);
            if (this.information && this.information.length > 0) {
                this.info = this.information[0];
                console.log('info');
                console.log(this.info);
            }
        });
    }

    setInfo(item: any) {
        item.selected = !item.selected;
        this.home.information = item.selected === true ? item.info : null;
        console.log(this.home);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.home.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        this.home.modifiedDate = this.modifiedDate != null ? moment(this.modifiedDate, DATE_TIME_FORMAT) : null;
        if (this.home.id !== undefined) {
            this.subscribeToSaveResponse(this.homeService.update(this.home));
        } else {
            this.subscribeToSaveResponse(this.homeService.create(this.home));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IHome>>) {
        result.subscribe((res: HttpResponse<IHome>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackInformationById(index: number, item: IInformation) {
        return item.id;
    }

    setCurrent(home: IHome, isCurrent: boolean) {
        home.current = isCurrent;
        this.homeService.update(home).subscribe(response => {
            if (response.status === 200) {
                this.error = null;
                this.success = 'OK';
            } else {
                this.success = null;
                this.error = 'ERROR';
            }
        });
    }
    onSlideSelected(item: any) {
        console.log(item);
    }
}
