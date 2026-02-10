import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router'; // Add RouterModule
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { AlertService } from 'app/core/services/alert.service'; // Added
import { AlertErrorComponent } from 'app/shared/alert/alert-error.component'; // New import
import { IHome } from 'app/shared/model/home.model';
import { HomeService } from './home.service';
import { IInformation } from 'app/shared/model/information.model';
import { InformationService } from 'app/entities/information';
import { Infobox } from 'app/widgets/infobox/infobox.component'; // New import
import { ISlide } from 'app/shared/model/slide.model';
import { SlideService } from '../slide';
import { IPortfolio, Portfolio } from 'app/shared/model/portfolio.model';
import { IService, Service } from 'app/shared/model/service.model';
import { IPartner, Partner } from 'app/shared/model/partner.model';
import { PortfolioService } from '../portfolio';
import { PartnerService } from '../partner';
import { ServiceService } from '../service';
// import { isArray, isNumber } from 'util'; // Removed

import { CommonModule } from '@angular/common'; // New import
import { FormsModule } from '@angular/forms'; // New import
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // New import
import { AlertComponent } from 'app/shared/alert/alert.component'; // This was mistakenly removed, re-adding.




import { InfoboxComponent } from 'app/widgets/infobox/infobox.component'; // New import
import { SlideSelectorComponent } from 'app/widgets/slides/slide-selector.component'; // New import
import { TileboxComponent } from 'app/widgets/tilebox/tilebox.component'; // New import
import { OwlSliderComponent } from 'app/widgets/owlslider/slider.component'; // New import


@Component({
    selector: 'jhi-home-update',
    templateUrl: './home-update.component.html',
    styleUrls: ['../entities.components.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        FontAwesomeModule,
        AlertComponent, // Re-added
        AlertErrorComponent, // Added
        RouterModule,

        InfoboxComponent,
        SlideSelectorComponent,
        TileboxComponent,
        OwlSliderComponent,
    ]
})
export class HomeUpdateComponent implements OnInit {
    home: IHome;
    isSaving: boolean;
    info: IInformation;
    information: any[];
    createdDate: string;
    modifiedDate: string;

    infoboxData: Infobox | null = null;

    slides: ISlide[] = [];
    portfolios: IPortfolio[] = [];
    services: IService[] = [];
    partners: IPartner[] = [];

    error: any;
    success: any;

    slideWidth = 600;
    slideHeight = 300;

    slideSelected: ISlide[] = [];

    constructor(
        protected slideService: SlideService,
        protected portfolioService: PortfolioService,
        protected partnerService: PartnerService,
        protected restService: ServiceService,
        // protected jhiAlertService: JhiAlertService, // Removed
        protected alertService: AlertService,
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

            if (this.home.information) {
                this.infoboxData = new Infobox(
                    this.home.information.id!,
                    this.home.information.title || 'No Title',
                    0, // Default type
                    this.home.information.content,
                    this.home.information.brief,
                    this.home.information.link,
                    this.home.information.linkText
                );
            }
        });
        this.loadInformation();
        this.loadSlides();
        this.loadServices();
        this.loadPortfolios();
        this.loadPartners();
    }

    loadPartners() {
        this.partnerService.query().subscribe((res: HttpResponse<IPartner[]>) => {
            this.partners = res.body || [];
        });
    }

    loadPortfolios() {
        this.portfolioService.query().subscribe((res: HttpResponse<IPortfolio[]>) => {
            this.portfolios = res.body || [];
        });
    }

    loadServices() {
        this.restService.query().subscribe((res: HttpResponse<IService[]>) => {
            this.services = res.body || [];
        });
    }

    loadSlides() {
        this.slideService.query().subscribe(
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
                this.information.push({ selected: false, info: item });
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
        this.home.createdDate = this.createdDate != null ? dayjs(this.createdDate, DATE_TIME_FORMAT) : null;
        this.home.modifiedDate = this.modifiedDate != null ? dayjs(this.modifiedDate, DATE_TIME_FORMAT) : null;
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
        this.alertService.addAlert({ type: 'danger', message: errorMessage });
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
    onSlideSelected(item: ISlide) {
        console.log('slides');
        if (!this.home.slides) {
            this.home.slides = [];
        }
        const slideIndex = this.home.slides.findIndex(slide => slide.id === item.id);
        if (slideIndex < 0) {
            this.home.slides.push(item);
        } else {
            this.home.slides.splice(slideIndex, 1);
        }
        console.log(this.home.slides);
    }

    trackId(index: number, item: IService) {
        return item.id;
    }

    selectPortfolio(portfolio: Portfolio) {
        if (!this.home.portfolios || !Array.isArray(this.home.portfolios)) {
            this.home.portfolios = [];
        }
        const itemIndex = this.home.portfolios.findIndex(item => item.id === portfolio.id);

        if (itemIndex < 0) {
            this.home.portfolios.push(portfolio);
        } else {
            this.home.portfolios.splice(itemIndex, 1);
        }
    }

    isSelectedPortfolio(portfolio: any): boolean {
        if (!this.home.portfolios || !Array.isArray(this.home.portfolios)) {
            return false;
        }
        const itemIndex = this.home.portfolios.findIndex(item => item.id === portfolio.id);
        return itemIndex > -1;
    }

    selectService(service: Service) {
        if (!this.home.services || !Array.isArray(this.home.services)) {
            this.home.services = [];
        }

        const itemIndex = this.home.services.findIndex(item => item.id === service.id);

        if (itemIndex < 0) {
            this.home.services.push(service);
        } else {
            this.home.services.splice(itemIndex, 1);
        }
    }

    isSelectedService(service: any): boolean {
        if (!this.home.services || !Array.isArray(this.home.services)) {
            return false;
        }
        const itemIndex = this.home.services.findIndex(item => item.id === service.id);
        return itemIndex > -1;
    }

    selectPartner(partner: Partner) {
        if (!this.home.partners || !Array.isArray(this.home.partners)) {
            this.home.partners = [];
        }

        const itemIndex = this.home.partners.findIndex(item => item.id === partner.id);

        if (itemIndex < 0) {
            this.home.partners.push(partner);
        } else {
            this.home.partners.splice(itemIndex, 1);
        }
    }

    isSelectedPartner(partner: any): boolean {
        if (!this.home.partners || !Array.isArray(this.home.partners)) {
            return false;
        }
        const itemIndex = this.home.partners.findIndex(item => item.id === partner.id);
        return itemIndex > -1;
    }
}