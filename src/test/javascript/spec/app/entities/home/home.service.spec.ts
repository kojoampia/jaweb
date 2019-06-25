/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { HomeService } from 'app/entities/home/home.service';
import { IHome, Home } from 'app/shared/model/home.model';

describe('Service Tests', () => {
    describe('Home Service', () => {
        let injector: TestBed;
        let service: HomeService;
        let httpMock: HttpTestingController;
        let elemDefault: IHome;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(HomeService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Home('ID', 'AAAAAAA', 'AAAAAAA', false, 0, [], [], [], [], currentDate, currentDate);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        createdDate: currentDate.format(DATE_TIME_FORMAT),
                        modifiedDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find('123')
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Home', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 'ID',
                        createdDate: currentDate.format(DATE_TIME_FORMAT),
                        modifiedDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        createdDate: currentDate,
                        modifiedDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Home(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Home', async () => {
                const returnedFromService = Object.assign(
                    {
                        header: 'BBBBBB',
                        createdDate: currentDate.format(DATE_TIME_FORMAT),
                        modifiedDate: currentDate.format(DATE_TIME_FORMAT),
                        createdBy: 'BBBBBB',
                        modifiedBy: 'BBBBBB',
                        current: true,
                        version: 1,
                        information: 'BBBBBB',
                        slides: [],
                        blogs: [],
                        services: [],
                        portfolio: []
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        createdDate: currentDate,
                        modifiedDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Home', async () => {
                const returnedFromService = Object.assign(
                    {
                        header: 'BBBBBB',
                        createdDate: currentDate.format(DATE_TIME_FORMAT),
                        modifiedDate: currentDate.format(DATE_TIME_FORMAT),
                        createdBy: 'BBBBBB',
                        modifiedBy: 'BBBBBB',
                        current: true,
                        version: 1,
                        information: 'BBBBBB',
                        slides: [],
                        blogs: [],
                        services: [],
                        portfolio: []
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        createdDate: currentDate,
                        modifiedDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Home', async () => {
                const rxPromise = service.delete('123').subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
