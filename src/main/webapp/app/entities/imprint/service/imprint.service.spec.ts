import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IImprint } from '../imprint.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../imprint.test-samples';

import { ImprintService, RestImprint } from './imprint.service';

const requireRestSample: RestImprint = {
  ...sampleWithRequiredData,
  createdDate: sampleWithRequiredData.createdDate?.toJSON(),
  modifiedDate: sampleWithRequiredData.modifiedDate?.toJSON(),
};

describe('Imprint Service', () => {
  let service: ImprintService;
  let httpMock: HttpTestingController;
  let expectedResult: IImprint | IImprint[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ImprintService);
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

    it('should create a Imprint', () => {
      const imprint = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(imprint).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Imprint', () => {
      const imprint = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(imprint).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Imprint', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Imprint', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Imprint', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addImprintToCollectionIfMissing', () => {
      it('should add a Imprint to an empty array', () => {
        const imprint: IImprint = sampleWithRequiredData;
        expectedResult = service.addImprintToCollectionIfMissing([], imprint);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(imprint);
      });

      it('should not add a Imprint to an array that contains it', () => {
        const imprint: IImprint = sampleWithRequiredData;
        const imprintCollection: IImprint[] = [
          {
            ...imprint,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addImprintToCollectionIfMissing(imprintCollection, imprint);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Imprint to an array that doesn't contain it", () => {
        const imprint: IImprint = sampleWithRequiredData;
        const imprintCollection: IImprint[] = [sampleWithPartialData];
        expectedResult = service.addImprintToCollectionIfMissing(imprintCollection, imprint);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(imprint);
      });

      it('should add only unique Imprint to an array', () => {
        const imprintArray: IImprint[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const imprintCollection: IImprint[] = [sampleWithRequiredData];
        expectedResult = service.addImprintToCollectionIfMissing(imprintCollection, ...imprintArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const imprint: IImprint = sampleWithRequiredData;
        const imprint2: IImprint = sampleWithPartialData;
        expectedResult = service.addImprintToCollectionIfMissing([], imprint, imprint2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(imprint);
        expect(expectedResult).toContain(imprint2);
      });

      it('should accept null and undefined values', () => {
        const imprint: IImprint = sampleWithRequiredData;
        expectedResult = service.addImprintToCollectionIfMissing([], null, imprint, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(imprint);
      });

      it('should return initial array if no Imprint is added', () => {
        const imprintCollection: IImprint[] = [sampleWithRequiredData];
        expectedResult = service.addImprintToCollectionIfMissing(imprintCollection, undefined, null);
        expect(expectedResult).toEqual(imprintCollection);
      });
    });

    describe('compareImprint', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareImprint(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareImprint(entity1, entity2);
        const compareResult2 = service.compareImprint(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.compareImprint(entity1, entity2);
        const compareResult2 = service.compareImprint(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.compareImprint(entity1, entity2);
        const compareResult2 = service.compareImprint(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
