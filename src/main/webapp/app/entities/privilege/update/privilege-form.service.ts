import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IPrivilege, NewPrivilege } from '../privilege.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPrivilege for edit and NewPrivilegeFormGroupInput for create.
 */
type PrivilegeFormGroupInput = IPrivilege | PartialWithRequiredKeyOf<NewPrivilege>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IPrivilege | NewPrivilege> = Omit<T, 'createdDate'> & {
  createdDate?: string | null;
};

type PrivilegeFormRawValue = FormValueOf<IPrivilege>;

type NewPrivilegeFormRawValue = FormValueOf<NewPrivilege>;

type PrivilegeFormDefaults = Pick<NewPrivilege, 'id' | 'createdDate'>;

type PrivilegeFormGroupContent = {
  id: FormControl<PrivilegeFormRawValue['id'] | NewPrivilege['id']>;
  name: FormControl<PrivilegeFormRawValue['name']>;
  createdDate: FormControl<PrivilegeFormRawValue['createdDate']>;
  createdBy: FormControl<PrivilegeFormRawValue['createdBy']>;
};

export type PrivilegeFormGroup = FormGroup<PrivilegeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PrivilegeFormService {
  createPrivilegeFormGroup(privilege: PrivilegeFormGroupInput = { id: null }): PrivilegeFormGroup {
    const privilegeRawValue = this.convertPrivilegeToPrivilegeRawValue({
      ...this.getFormDefaults(),
      ...privilege,
    });
    return new FormGroup<PrivilegeFormGroupContent>({
      id: new FormControl(
        { value: privilegeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      name: new FormControl(privilegeRawValue.name),
      createdDate: new FormControl(privilegeRawValue.createdDate),
      createdBy: new FormControl(privilegeRawValue.createdBy),
    });
  }

  getPrivilege(form: PrivilegeFormGroup): IPrivilege | NewPrivilege {
    return this.convertPrivilegeRawValueToPrivilege(form.getRawValue() as PrivilegeFormRawValue | NewPrivilegeFormRawValue);
  }

  resetForm(form: PrivilegeFormGroup, privilege: PrivilegeFormGroupInput): void {
    const privilegeRawValue = this.convertPrivilegeToPrivilegeRawValue({ ...this.getFormDefaults(), ...privilege });
    form.reset(
      {
        ...privilegeRawValue,
        id: { value: privilegeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): PrivilegeFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdDate: currentTime,
    };
  }

  private convertPrivilegeRawValueToPrivilege(rawPrivilege: PrivilegeFormRawValue | NewPrivilegeFormRawValue): IPrivilege | NewPrivilege {
    return {
      ...rawPrivilege,
      createdDate: dayjs(rawPrivilege.createdDate, DATE_TIME_FORMAT),
    };
  }

  private convertPrivilegeToPrivilegeRawValue(
    privilege: IPrivilege | (Partial<NewPrivilege> & PrivilegeFormDefaults),
  ): PrivilegeFormRawValue | PartialWithRequiredKeyOf<NewPrivilegeFormRawValue> {
    return {
      ...privilege,
      createdDate: privilege.createdDate ? privilege.createdDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
