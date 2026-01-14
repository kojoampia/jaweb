import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../career.test-samples';

import { CareerFormService } from './career-form.service';

describe('Career Form Service', () => {
  let service: CareerFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareerFormService);
  });

  describe('Service methods', () => {
    describe('createCareerFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCareerFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            description: expect.any(Object),
            department: expect.any(Object),
            createdDate: expect.any(Object),
            modifiedDate: expect.any(Object),
            lastModifiedBy: expect.any(Object),
            url: expect.any(Object),
            document: expect.any(Object),
            documentContentType: expect.any(Object),
          }),
        );
      });

      it('passing ICareer should create a new form with FormGroup', () => {
        const formGroup = service.createCareerFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            description: expect.any(Object),
            department: expect.any(Object),
            createdDate: expect.any(Object),
            modifiedDate: expect.any(Object),
            lastModifiedBy: expect.any(Object),
            url: expect.any(Object),
            document: expect.any(Object),
            documentContentType: expect.any(Object),
          }),
        );
      });
    });

    describe('getCareer', () => {
      it('should return NewCareer for default Career initial value', () => {
        const formGroup = service.createCareerFormGroup(sampleWithNewData);

        const career = service.getCareer(formGroup) as any;

        expect(career).toMatchObject(sampleWithNewData);
      });

      it('should return NewCareer for empty Career initial value', () => {
        const formGroup = service.createCareerFormGroup();

        const career = service.getCareer(formGroup) as any;

        expect(career).toMatchObject({});
      });

      it('should return ICareer', () => {
        const formGroup = service.createCareerFormGroup(sampleWithRequiredData);

        const career = service.getCareer(formGroup) as any;

        expect(career).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICareer should not enable id FormControl', () => {
        const formGroup = service.createCareerFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCareer should disable id FormControl', () => {
        const formGroup = service.createCareerFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
