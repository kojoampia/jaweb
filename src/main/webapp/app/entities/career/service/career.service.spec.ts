import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICareer } from '../career.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../career.test-samples';

import { CareerService, RestCareer } from './career.service';

const requireRestSample: RestCareer = {
  ...sampleWithRequiredData,
  createdDate: sampleWithRequiredData.createdDate?.toJSON(),
  modifiedDate: sampleWithRequiredData.modifiedDate?.toJSON(),
};

describe('Career Service', () => {
  let service: CareerService;
  let httpMock: HttpTestingController;
  let expectedResult: ICareer | ICareer[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CareerService);
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

    it('should create a Career', () => {
      const career = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(career).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Career', () => {
      const career = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(career).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Career', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Career', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Career', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCareerToCollectionIfMissing', () => {
      it('should add a Career to an empty array', () => {
        const career: ICareer = sampleWithRequiredData;
        expectedResult = service.addCareerToCollectionIfMissing([], career);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(career);
      });

      it('should not add a Career to an array that contains it', () => {
        const career: ICareer = sampleWithRequiredData;
        const careerCollection: ICareer[] = [
          {
            ...career,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCareerToCollectionIfMissing(careerCollection, career);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Career to an array that doesn't contain it", () => {
        const career: ICareer = sampleWithRequiredData;
        const careerCollection: ICareer[] = [sampleWithPartialData];
        expectedResult = service.addCareerToCollectionIfMissing(careerCollection, career);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(career);
      });

      it('should add only unique Career to an array', () => {
        const careerArray: ICareer[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const careerCollection: ICareer[] = [sampleWithRequiredData];
        expectedResult = service.addCareerToCollectionIfMissing(careerCollection, ...careerArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const career: ICareer = sampleWithRequiredData;
        const career2: ICareer = sampleWithPartialData;
        expectedResult = service.addCareerToCollectionIfMissing([], career, career2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(career);
        expect(expectedResult).toContain(career2);
      });

      it('should accept null and undefined values', () => {
        const career: ICareer = sampleWithRequiredData;
        expectedResult = service.addCareerToCollectionIfMissing([], null, career, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(career);
      });

      it('should return initial array if no Career is added', () => {
        const careerCollection: ICareer[] = [sampleWithRequiredData];
        expectedResult = service.addCareerToCollectionIfMissing(careerCollection, undefined, null);
        expect(expectedResult).toEqual(careerCollection);
      });
    });

    describe('compareCareer', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCareer(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareCareer(entity1, entity2);
        const compareResult2 = service.compareCareer(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.compareCareer(entity1, entity2);
        const compareResult2 = service.compareCareer(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.compareCareer(entity1, entity2);
        const compareResult2 = service.compareCareer(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
