import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../imprint.test-samples';

import { ImprintFormService } from './imprint-form.service';

describe('Imprint Form Service', () => {
  let service: ImprintFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImprintFormService);
  });

  describe('Service methods', () => {
    describe('createImprintFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createImprintFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            title: expect.any(Object),
            content: expect.any(Object),
            slides: expect.any(Object),
            createdDate: expect.any(Object),
            modifiedDate: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          }),
        );
      });

      it('passing IImprint should create a new form with FormGroup', () => {
        const formGroup = service.createImprintFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            title: expect.any(Object),
            content: expect.any(Object),
            slides: expect.any(Object),
            createdDate: expect.any(Object),
            modifiedDate: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          }),
        );
      });
    });

    describe('getImprint', () => {
      it('should return NewImprint for default Imprint initial value', () => {
        const formGroup = service.createImprintFormGroup(sampleWithNewData);

        const imprint = service.getImprint(formGroup) as any;

        expect(imprint).toMatchObject(sampleWithNewData);
      });

      it('should return NewImprint for empty Imprint initial value', () => {
        const formGroup = service.createImprintFormGroup();

        const imprint = service.getImprint(formGroup) as any;

        expect(imprint).toMatchObject({});
      });

      it('should return IImprint', () => {
        const formGroup = service.createImprintFormGroup(sampleWithRequiredData);

        const imprint = service.getImprint(formGroup) as any;

        expect(imprint).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IImprint should not enable id FormControl', () => {
        const formGroup = service.createImprintFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewImprint should disable id FormControl', () => {
        const formGroup = service.createImprintFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
