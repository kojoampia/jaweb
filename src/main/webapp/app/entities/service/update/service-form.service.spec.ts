import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../service.test-samples';

import { ServiceFormService } from './service-form.service';

describe('Service Form Service', () => {
  let service: ServiceFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceFormService);
  });

  describe('Service methods', () => {
    describe('createServiceFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createServiceFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            description: expect.any(Object),
            photo: expect.any(Object),
            createdDate: expect.any(Object),
            modifiedDate: expect.any(Object),
            createdBy: expect.any(Object),
            modifiedBy: expect.any(Object),
            contact: expect.any(Object),
            url: expect.any(Object),
            document: expect.any(Object),
            documentContentType: expect.any(Object),
          }),
        );
      });

      it('passing IService should create a new form with FormGroup', () => {
        const formGroup = service.createServiceFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            description: expect.any(Object),
            photo: expect.any(Object),
            createdDate: expect.any(Object),
            modifiedDate: expect.any(Object),
            createdBy: expect.any(Object),
            modifiedBy: expect.any(Object),
            contact: expect.any(Object),
            url: expect.any(Object),
            document: expect.any(Object),
            documentContentType: expect.any(Object),
          }),
        );
      });
    });

    describe('getService', () => {
      it('should return NewService for default Service initial value', () => {
        const formGroup = service.createServiceFormGroup(sampleWithNewData);

        const serviceValue = service.getService(formGroup) as any;

        expect(serviceValue).toMatchObject(sampleWithNewData);
      });

      it('should return NewService for empty Service initial value', () => {
        const formGroup = service.createServiceFormGroup();

        const serviceValue = service.getService(formGroup) as any;

        expect(serviceValue).toMatchObject({});
      });

      it('should return IService', () => {
        const formGroup = service.createServiceFormGroup(sampleWithRequiredData);

        const serviceValue = service.getService(formGroup) as any;

        expect(serviceValue).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IService should not enable id FormControl', () => {
        const formGroup = service.createServiceFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewService should disable id FormControl', () => {
        const formGroup = service.createServiceFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
