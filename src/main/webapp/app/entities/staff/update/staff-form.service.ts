import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IStaff, NewStaff } from '../staff.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IStaff for edit and NewStaffFormGroupInput for create.
 */
type StaffFormGroupInput = IStaff | PartialWithRequiredKeyOf<NewStaff>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IStaff | NewStaff> = Omit<T, 'createdDate' | 'modifiedDate'> & {
  createdDate?: string | null;
  modifiedDate?: string | null;
};

type StaffFormRawValue = FormValueOf<IStaff>;

type NewStaffFormRawValue = FormValueOf<NewStaff>;

type StaffFormDefaults = Pick<NewStaff, 'id' | 'createdDate' | 'modifiedDate'>;

type StaffFormGroupContent = {
  id: FormControl<StaffFormRawValue['id'] | NewStaff['id']>;
  firstName: FormControl<StaffFormRawValue['firstName']>;
  lastName: FormControl<StaffFormRawValue['lastName']>;
  dateOfBirth: FormControl<StaffFormRawValue['dateOfBirth']>;
  email: FormControl<StaffFormRawValue['email']>;
  digitalAddress: FormControl<StaffFormRawValue['digitalAddress']>;
  streetAddress: FormControl<StaffFormRawValue['streetAddress']>;
  postalAddress: FormControl<StaffFormRawValue['postalAddress']>;
  town: FormControl<StaffFormRawValue['town']>;
  district: FormControl<StaffFormRawValue['district']>;
  city: FormControl<StaffFormRawValue['city']>;
  region: FormControl<StaffFormRawValue['region']>;
  country: FormControl<StaffFormRawValue['country']>;
  digitalProfile: FormControl<StaffFormRawValue['digitalProfile']>;
  digitalProfileContentType: FormControl<StaffFormRawValue['digitalProfileContentType']>;
  accountNumber: FormControl<StaffFormRawValue['accountNumber']>;
  accountType: FormControl<StaffFormRawValue['accountType']>;
  documents: FormControl<StaffFormRawValue['documents']>;
  documentsContentType: FormControl<StaffFormRawValue['documentsContentType']>;
  createdDate: FormControl<StaffFormRawValue['createdDate']>;
  modifiedDate: FormControl<StaffFormRawValue['modifiedDate']>;
  lastModifiedBy: FormControl<StaffFormRawValue['lastModifiedBy']>;
  documentType: FormControl<StaffFormRawValue['documentType']>;
  credential: FormControl<StaffFormRawValue['credential']>;
};

export type StaffFormGroup = FormGroup<StaffFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class StaffFormService {
  createStaffFormGroup(staff: StaffFormGroupInput = { id: null }): StaffFormGroup {
    const staffRawValue = this.convertStaffToStaffRawValue({
      ...this.getFormDefaults(),
      ...staff,
    });
    return new FormGroup<StaffFormGroupContent>({
      id: new FormControl(
        { value: staffRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      firstName: new FormControl(staffRawValue.firstName),
      lastName: new FormControl(staffRawValue.lastName),
      dateOfBirth: new FormControl(staffRawValue.dateOfBirth),
      email: new FormControl(staffRawValue.email, {
        validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')],
      }),
      digitalAddress: new FormControl(staffRawValue.digitalAddress),
      streetAddress: new FormControl(staffRawValue.streetAddress),
      postalAddress: new FormControl(staffRawValue.postalAddress),
      town: new FormControl(staffRawValue.town),
      district: new FormControl(staffRawValue.district),
      city: new FormControl(staffRawValue.city),
      region: new FormControl(staffRawValue.region),
      country: new FormControl(staffRawValue.country),
      digitalProfile: new FormControl(staffRawValue.digitalProfile),
      digitalProfileContentType: new FormControl(staffRawValue.digitalProfileContentType),
      accountNumber: new FormControl(staffRawValue.accountNumber),
      accountType: new FormControl(staffRawValue.accountType),
      documents: new FormControl(staffRawValue.documents),
      documentsContentType: new FormControl(staffRawValue.documentsContentType),
      createdDate: new FormControl(staffRawValue.createdDate),
      modifiedDate: new FormControl(staffRawValue.modifiedDate),
      lastModifiedBy: new FormControl(staffRawValue.lastModifiedBy),
      documentType: new FormControl(staffRawValue.documentType, {
        validators: [Validators.required],
      }),
      credential: new FormControl(staffRawValue.credential),
    });
  }

  getStaff(form: StaffFormGroup): IStaff | NewStaff {
    return this.convertStaffRawValueToStaff(form.getRawValue() as StaffFormRawValue | NewStaffFormRawValue);
  }

  resetForm(form: StaffFormGroup, staff: StaffFormGroupInput): void {
    const staffRawValue = this.convertStaffToStaffRawValue({ ...this.getFormDefaults(), ...staff });
    form.reset(
      {
        ...staffRawValue,
        id: { value: staffRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): StaffFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdDate: currentTime,
      modifiedDate: currentTime,
    };
  }

  private convertStaffRawValueToStaff(rawStaff: StaffFormRawValue | NewStaffFormRawValue): IStaff | NewStaff {
    return {
      ...rawStaff,
      createdDate: dayjs(rawStaff.createdDate, DATE_TIME_FORMAT),
      modifiedDate: dayjs(rawStaff.modifiedDate, DATE_TIME_FORMAT),
    };
  }

  private convertStaffToStaffRawValue(
    staff: IStaff | (Partial<NewStaff> & StaffFormDefaults),
  ): StaffFormRawValue | PartialWithRequiredKeyOf<NewStaffFormRawValue> {
    return {
      ...staff,
      createdDate: staff.createdDate ? staff.createdDate.format(DATE_TIME_FORMAT) : undefined,
      modifiedDate: staff.modifiedDate ? staff.modifiedDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
