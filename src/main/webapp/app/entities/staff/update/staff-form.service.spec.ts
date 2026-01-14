import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../staff.test-samples';

import { StaffFormService } from './staff-form.service';

describe('Staff Form Service', () => {
  let service: StaffFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffFormService);
  });

  describe('Service methods', () => {
    describe('createStaffFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createStaffFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            firstName: expect.any(Object),
            lastName: expect.any(Object),
            dateOfBirth: expect.any(Object),
            email: expect.any(Object),
            digitalAddress: expect.any(Object),
            streetAddress: expect.any(Object),
            postalAddress: expect.any(Object),
            town: expect.any(Object),
            district: expect.any(Object),
            city: expect.any(Object),
            region: expect.any(Object),
            country: expect.any(Object),
            digitalProfile: expect.any(Object),
            accountNumber: expect.any(Object),
            accountType: expect.any(Object),
            documents: expect.any(Object),
            createdDate: expect.any(Object),
            modifiedDate: expect.any(Object),
            lastModifiedBy: expect.any(Object),
            documentType: expect.any(Object),
            credential: expect.any(Object),
          }),
        );
      });

      it('passing IStaff should create a new form with FormGroup', () => {
        const formGroup = service.createStaffFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            firstName: expect.any(Object),
            lastName: expect.any(Object),
            dateOfBirth: expect.any(Object),
            email: expect.any(Object),
            digitalAddress: expect.any(Object),
            streetAddress: expect.any(Object),
            postalAddress: expect.any(Object),
            town: expect.any(Object),
            district: expect.any(Object),
            city: expect.any(Object),
            region: expect.any(Object),
            country: expect.any(Object),
            digitalProfile: expect.any(Object),
            accountNumber: expect.any(Object),
            accountType: expect.any(Object),
            documents: expect.any(Object),
            createdDate: expect.any(Object),
            modifiedDate: expect.any(Object),
            lastModifiedBy: expect.any(Object),
            documentType: expect.any(Object),
            credential: expect.any(Object),
          }),
        );
      });
    });

    describe('getStaff', () => {
      it('should return NewStaff for default Staff initial value', () => {
        const formGroup = service.createStaffFormGroup(sampleWithNewData);

        const staff = service.getStaff(formGroup) as any;

        expect(staff).toMatchObject(sampleWithNewData);
      });

      it('should return NewStaff for empty Staff initial value', () => {
        const formGroup = service.createStaffFormGroup();

        const staff = service.getStaff(formGroup) as any;

        expect(staff).toMatchObject({});
      });

      it('should return IStaff', () => {
        const formGroup = service.createStaffFormGroup(sampleWithRequiredData);

        const staff = service.getStaff(formGroup) as any;

        expect(staff).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IStaff should not enable id FormControl', () => {
        const formGroup = service.createStaffFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewStaff should disable id FormControl', () => {
        const formGroup = service.createStaffFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
