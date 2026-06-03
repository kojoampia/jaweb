import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IService } from '../service.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../service.test-samples';

import { ServiceService, RestService } from './service.service';

const requireRestSample: RestService = {
  ...sampleWithRequiredData,
  createdDate: sampleWithRequiredData.createdDate?.toJSON(),
  modifiedDate: sampleWithRequiredData.modifiedDate?.toJSON(),
};

describe('Service Service', () => {
  let service: ServiceService;
  let httpMock: HttpTestingController;
  let expectedResult: IService | IService[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find('ABC').subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Service', () => {
      const newService = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(newService).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Service', () => {
      const servicePayload = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(servicePayload).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Service', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Service', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Service', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addServiceToCollectionIfMissing', () => {
      it('should add a Service to an empty array', () => {
        const serviceEntity: IService = sampleWithRequiredData;
        expectedResult = service.addServiceToCollectionIfMissing([], serviceEntity);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(serviceEntity);
      });

      it('should not add a Service to an array that contains it', () => {
        const serviceEntity: IService = sampleWithRequiredData;
        const serviceCollection: IService[] = [
          {
            ...serviceEntity,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addServiceToCollectionIfMissing(serviceCollection, serviceEntity);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Service to an array that doesn't contain it", () => {
        const serviceEntity: IService = sampleWithRequiredData;
        const serviceCollection: IService[] = [sampleWithPartialData];
        expectedResult = service.addServiceToCollectionIfMissing(serviceCollection, serviceEntity);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(serviceEntity);
      });

      it('should add only unique Service to an array', () => {
        const serviceArray: IService[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const serviceCollection: IService[] = [sampleWithRequiredData];
        expectedResult = service.addServiceToCollectionIfMissing(serviceCollection, ...serviceArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const serviceEntity: IService = sampleWithRequiredData;
        const serviceEntity2: IService = sampleWithPartialData;
        expectedResult = service.addServiceToCollectionIfMissing([], serviceEntity, serviceEntity2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(serviceEntity);
        expect(expectedResult).toContain(serviceEntity2);
      });

      it('should accept null and undefined values', () => {
        const serviceEntity: IService = sampleWithRequiredData;
        expectedResult = service.addServiceToCollectionIfMissing([], null, serviceEntity, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(serviceEntity);
      });

      it('should return initial array if no Service is added', () => {
        const serviceCollection: IService[] = [sampleWithRequiredData];
        expectedResult = service.addServiceToCollectionIfMissing(serviceCollection, undefined, null);
        expect(expectedResult).toEqual(serviceCollection);
      });
    });

    describe('compareService', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareService(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareService(entity1, entity2);
        const compareResult2 = service.compareService(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.compareService(entity1, entity2);
        const compareResult2 = service.compareService(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.compareService(entity1, entity2);
        const compareResult2 = service.compareService(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
