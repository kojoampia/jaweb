import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../about.test-samples';

import { AboutFormService } from './about-form.service';

describe('About Form Service', () => {
  let service: AboutFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboutFormService);
  });

  describe('Service methods', () => {
    describe('createAboutFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAboutFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            title: expect.any(Object),
            content: expect.any(Object),
            language: expect.any(Object),
            createdDate: expect.any(Object),
            modifiedDate: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          }),
        );
      });

      it('passing IAbout should create a new form with FormGroup', () => {
        const formGroup = service.createAboutFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            title: expect.any(Object),
            content: expect.any(Object),
            language: expect.any(Object),
            createdDate: expect.any(Object),
            modifiedDate: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          }),
        );
      });
    });

    describe('getAbout', () => {
      it('should return NewAbout for default About initial value', () => {
        const formGroup = service.createAboutFormGroup(sampleWithNewData);

        const about = service.getAbout(formGroup) as any;

        expect(about).toMatchObject(sampleWithNewData);
      });

      it('should return NewAbout for empty About initial value', () => {
        const formGroup = service.createAboutFormGroup();

        const about = service.getAbout(formGroup) as any;

        expect(about).toMatchObject({});
      });

      it('should return IAbout', () => {
        const formGroup = service.createAboutFormGroup(sampleWithRequiredData);

        const about = service.getAbout(formGroup) as any;

        expect(about).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAbout should not enable id FormControl', () => {
        const formGroup = service.createAboutFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAbout should disable id FormControl', () => {
        const formGroup = service.createAboutFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
