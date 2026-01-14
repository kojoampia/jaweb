import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ICareer, NewCareer } from '../career.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICareer for edit and NewCareerFormGroupInput for create.
 */
type CareerFormGroupInput = ICareer | PartialWithRequiredKeyOf<NewCareer>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ICareer | NewCareer> = Omit<T, 'createdDate' | 'modifiedDate'> & {
  createdDate?: string | null;
  modifiedDate?: string | null;
};

type CareerFormRawValue = FormValueOf<ICareer>;

type NewCareerFormRawValue = FormValueOf<NewCareer>;

type CareerFormDefaults = Pick<NewCareer, 'id' | 'createdDate' | 'modifiedDate'>;

type CareerFormGroupContent = {
  id: FormControl<CareerFormRawValue['id'] | NewCareer['id']>;
  name: FormControl<CareerFormRawValue['name']>;
  description: FormControl<CareerFormRawValue['description']>;
  department: FormControl<CareerFormRawValue['department']>;
  createdDate: FormControl<CareerFormRawValue['createdDate']>;
  modifiedDate: FormControl<CareerFormRawValue['modifiedDate']>;
  lastModifiedBy: FormControl<CareerFormRawValue['lastModifiedBy']>;
  url: FormControl<CareerFormRawValue['url']>;
  document: FormControl<CareerFormRawValue['document']>;
  documentContentType: FormControl<CareerFormRawValue['documentContentType']>;
};

export type CareerFormGroup = FormGroup<CareerFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CareerFormService {
  createCareerFormGroup(career: CareerFormGroupInput = { id: null }): CareerFormGroup {
    const careerRawValue = this.convertCareerToCareerRawValue({
      ...this.getFormDefaults(),
      ...career,
    });
    return new FormGroup<CareerFormGroupContent>({
      id: new FormControl(
        { value: careerRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      name: new FormControl(careerRawValue.name),
      description: new FormControl(careerRawValue.description),
      department: new FormControl(careerRawValue.department),
      createdDate: new FormControl(careerRawValue.createdDate),
      modifiedDate: new FormControl(careerRawValue.modifiedDate),
      lastModifiedBy: new FormControl(careerRawValue.lastModifiedBy),
      url: new FormControl(careerRawValue.url),
      document: new FormControl(careerRawValue.document),
      documentContentType: new FormControl(careerRawValue.documentContentType),
    });
  }

  getCareer(form: CareerFormGroup): ICareer | NewCareer {
    return this.convertCareerRawValueToCareer(form.getRawValue() as CareerFormRawValue | NewCareerFormRawValue);
  }

  resetForm(form: CareerFormGroup, career: CareerFormGroupInput): void {
    const careerRawValue = this.convertCareerToCareerRawValue({ ...this.getFormDefaults(), ...career });
    form.reset(
      {
        ...careerRawValue,
        id: { value: careerRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CareerFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdDate: currentTime,
      modifiedDate: currentTime,
    };
  }

  private convertCareerRawValueToCareer(rawCareer: CareerFormRawValue | NewCareerFormRawValue): ICareer | NewCareer {
    return {
      ...rawCareer,
      createdDate: dayjs(rawCareer.createdDate, DATE_TIME_FORMAT),
      modifiedDate: dayjs(rawCareer.modifiedDate, DATE_TIME_FORMAT),
    };
  }

  private convertCareerToCareerRawValue(
    career: ICareer | (Partial<NewCareer> & CareerFormDefaults),
  ): CareerFormRawValue | PartialWithRequiredKeyOf<NewCareerFormRawValue> {
    return {
      ...career,
      createdDate: career.createdDate ? career.createdDate.format(DATE_TIME_FORMAT) : undefined,
      modifiedDate: career.modifiedDate ? career.modifiedDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
