/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { StaffService } from 'app/entities/staff/staff.service';
import { IStaff, Staff, DocumentType } from 'app/shared/model/staff.model';

describe('Service Tests', () => {
    describe('Staff Service', () => {
        let injector: TestBed;
        let service: StaffService;
        let httpMock: HttpTestingController;
        let elemDefault: IStaff;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(StaffService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Staff(
                'ID',
                'AAAAAAA',
                'AAAAAAA',
                currentDate,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'image/png',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'image/png',
                'AAAAAAA',
                currentDate,
                currentDate,
                'AAAAAAA',
                DocumentType.NATIONAL_ID
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        dateOfBirth: currentDate.format(DATE_FORMAT),
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

            it('should create a Staff', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 'ID',
                        dateOfBirth: currentDate.format(DATE_FORMAT),
                        createdDate: currentDate.format(DATE_TIME_FORMAT),
                        modifiedDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dateOfBirth: currentDate,
                        createdDate: currentDate,
                        modifiedDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Staff(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Staff', async () => {
                const returnedFromService = Object.assign(
                    {
                        firstName: 'BBBBBB',
                        lastName: 'BBBBBB',
                        dateOfBirth: currentDate.format(DATE_FORMAT),
                        email: 'BBBBBB',
                        digitalAddress: 'BBBBBB',
                        streetAddress: 'BBBBBB',
                        postalAddress: 'BBBBBB',
                        town: 'BBBBBB',
                        district: 'BBBBBB',
                        city: 'BBBBBB',
                        region: 'BBBBBB',
                        country: 'BBBBBB',
                        digitalProfile: 'BBBBBB',
                        accountNumber: 'BBBBBB',
                        accountType: 'BBBBBB',
                        documents: 'BBBBBB',
                        createdDate: currentDate.format(DATE_TIME_FORMAT),
                        modifiedDate: currentDate.format(DATE_TIME_FORMAT),
                        lastModifiedBy: 'BBBBBB',
                        documentType: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        dateOfBirth: currentDate,
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

            it('should return a list of Staff', async () => {
                const returnedFromService = Object.assign(
                    {
                        firstName: 'BBBBBB',
                        lastName: 'BBBBBB',
                        dateOfBirth: currentDate.format(DATE_FORMAT),
                        email: 'BBBBBB',
                        digitalAddress: 'BBBBBB',
                        streetAddress: 'BBBBBB',
                        postalAddress: 'BBBBBB',
                        town: 'BBBBBB',
                        district: 'BBBBBB',
                        city: 'BBBBBB',
                        region: 'BBBBBB',
                        country: 'BBBBBB',
                        digitalProfile: 'BBBBBB',
                        accountNumber: 'BBBBBB',
                        accountType: 'BBBBBB',
                        documents: 'BBBBBB',
                        createdDate: currentDate.format(DATE_TIME_FORMAT),
                        modifiedDate: currentDate.format(DATE_TIME_FORMAT),
                        lastModifiedBy: 'BBBBBB',
                        documentType: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dateOfBirth: currentDate,
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

            it('should delete a Staff', async () => {
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
