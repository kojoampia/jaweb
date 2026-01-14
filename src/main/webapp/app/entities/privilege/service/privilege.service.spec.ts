import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPrivilege } from '../privilege.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../privilege.test-samples';

import { PrivilegeService, RestPrivilege } from './privilege.service';

const requireRestSample: RestPrivilege = {
  ...sampleWithRequiredData,
  createdDate: sampleWithRequiredData.createdDate?.toJSON(),
};

describe('Privilege Service', () => {
  let service: PrivilegeService;
  let httpMock: HttpTestingController;
  let expectedResult: IPrivilege | IPrivilege[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PrivilegeService);
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

    it('should create a Privilege', () => {
      const privilege = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(privilege).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Privilege', () => {
      const privilege = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(privilege).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Privilege', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Privilege', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Privilege', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPrivilegeToCollectionIfMissing', () => {
      it('should add a Privilege to an empty array', () => {
        const privilege: IPrivilege = sampleWithRequiredData;
        expectedResult = service.addPrivilegeToCollectionIfMissing([], privilege);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(privilege);
      });

      it('should not add a Privilege to an array that contains it', () => {
        const privilege: IPrivilege = sampleWithRequiredData;
        const privilegeCollection: IPrivilege[] = [
          {
            ...privilege,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPrivilegeToCollectionIfMissing(privilegeCollection, privilege);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Privilege to an array that doesn't contain it", () => {
        const privilege: IPrivilege = sampleWithRequiredData;
        const privilegeCollection: IPrivilege[] = [sampleWithPartialData];
        expectedResult = service.addPrivilegeToCollectionIfMissing(privilegeCollection, privilege);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(privilege);
      });

      it('should add only unique Privilege to an array', () => {
        const privilegeArray: IPrivilege[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const privilegeCollection: IPrivilege[] = [sampleWithRequiredData];
        expectedResult = service.addPrivilegeToCollectionIfMissing(privilegeCollection, ...privilegeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const privilege: IPrivilege = sampleWithRequiredData;
        const privilege2: IPrivilege = sampleWithPartialData;
        expectedResult = service.addPrivilegeToCollectionIfMissing([], privilege, privilege2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(privilege);
        expect(expectedResult).toContain(privilege2);
      });

      it('should accept null and undefined values', () => {
        const privilege: IPrivilege = sampleWithRequiredData;
        expectedResult = service.addPrivilegeToCollectionIfMissing([], null, privilege, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(privilege);
      });

      it('should return initial array if no Privilege is added', () => {
        const privilegeCollection: IPrivilege[] = [sampleWithRequiredData];
        expectedResult = service.addPrivilegeToCollectionIfMissing(privilegeCollection, undefined, null);
        expect(expectedResult).toEqual(privilegeCollection);
      });
    });

    describe('comparePrivilege', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePrivilege(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.comparePrivilege(entity1, entity2);
        const compareResult2 = service.comparePrivilege(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.comparePrivilege(entity1, entity2);
        const compareResult2 = service.comparePrivilege(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.comparePrivilege(entity1, entity2);
        const compareResult2 = service.comparePrivilege(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
