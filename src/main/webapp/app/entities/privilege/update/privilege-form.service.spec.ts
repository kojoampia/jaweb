import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../privilege.test-samples';

import { PrivilegeFormService } from './privilege-form.service';

describe('Privilege Form Service', () => {
  let service: PrivilegeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivilegeFormService);
  });

  describe('Service methods', () => {
    describe('createPrivilegeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPrivilegeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            createdDate: expect.any(Object),
            createdBy: expect.any(Object),
          }),
        );
      });

      it('passing IPrivilege should create a new form with FormGroup', () => {
        const formGroup = service.createPrivilegeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            createdDate: expect.any(Object),
            createdBy: expect.any(Object),
          }),
        );
      });
    });

    describe('getPrivilege', () => {
      it('should return NewPrivilege for default Privilege initial value', () => {
        const formGroup = service.createPrivilegeFormGroup(sampleWithNewData);

        const privilege = service.getPrivilege(formGroup) as any;

        expect(privilege).toMatchObject(sampleWithNewData);
      });

      it('should return NewPrivilege for empty Privilege initial value', () => {
        const formGroup = service.createPrivilegeFormGroup();

        const privilege = service.getPrivilege(formGroup) as any;

        expect(privilege).toMatchObject({});
      });

      it('should return IPrivilege', () => {
        const formGroup = service.createPrivilegeFormGroup(sampleWithRequiredData);

        const privilege = service.getPrivilege(formGroup) as any;

        expect(privilege).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPrivilege should not enable id FormControl', () => {
        const formGroup = service.createPrivilegeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPrivilege should disable id FormControl', () => {
        const formGroup = service.createPrivilegeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
