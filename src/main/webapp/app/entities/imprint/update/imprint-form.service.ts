import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IImprint, NewImprint } from '../imprint.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IImprint for edit and NewImprintFormGroupInput for create.
 */
type ImprintFormGroupInput = IImprint | PartialWithRequiredKeyOf<NewImprint>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IImprint | NewImprint> = Omit<T, 'createdDate' | 'modifiedDate'> & {
  createdDate?: string | null;
  modifiedDate?: string | null;
};

type ImprintFormRawValue = FormValueOf<IImprint>;

type NewImprintFormRawValue = FormValueOf<NewImprint>;

type ImprintFormDefaults = Pick<NewImprint, 'id' | 'createdDate' | 'modifiedDate'>;

type ImprintFormGroupContent = {
  id: FormControl<ImprintFormRawValue['id'] | NewImprint['id']>;
  title: FormControl<ImprintFormRawValue['title']>;
  content: FormControl<ImprintFormRawValue['content']>;
  slides: FormControl<ImprintFormRawValue['slides']>;
  createdDate: FormControl<ImprintFormRawValue['createdDate']>;
  modifiedDate: FormControl<ImprintFormRawValue['modifiedDate']>;
  lastModifiedBy: FormControl<ImprintFormRawValue['lastModifiedBy']>;
};

export type ImprintFormGroup = FormGroup<ImprintFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ImprintFormService {
  createImprintFormGroup(imprint: ImprintFormGroupInput = { id: null }): ImprintFormGroup {
    const imprintRawValue = this.convertImprintToImprintRawValue({
      ...this.getFormDefaults(),
      ...imprint,
    });
    return new FormGroup<ImprintFormGroupContent>({
      id: new FormControl(
        { value: imprintRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      title: new FormControl(imprintRawValue.title),
      content: new FormControl(imprintRawValue.content),
      slides: new FormControl(imprintRawValue.slides),
      createdDate: new FormControl(imprintRawValue.createdDate),
      modifiedDate: new FormControl(imprintRawValue.modifiedDate),
      lastModifiedBy: new FormControl(imprintRawValue.lastModifiedBy),
    });
  }

  getImprint(form: ImprintFormGroup): IImprint | NewImprint {
    return this.convertImprintRawValueToImprint(form.getRawValue() as ImprintFormRawValue | NewImprintFormRawValue);
  }

  resetForm(form: ImprintFormGroup, imprint: ImprintFormGroupInput): void {
    const imprintRawValue = this.convertImprintToImprintRawValue({ ...this.getFormDefaults(), ...imprint });
    form.reset(
      {
        ...imprintRawValue,
        id: { value: imprintRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ImprintFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdDate: currentTime,
      modifiedDate: currentTime,
    };
  }

  private convertImprintRawValueToImprint(rawImprint: ImprintFormRawValue | NewImprintFormRawValue): IImprint | NewImprint {
    return {
      ...rawImprint,
      createdDate: dayjs(rawImprint.createdDate, DATE_TIME_FORMAT),
      modifiedDate: dayjs(rawImprint.modifiedDate, DATE_TIME_FORMAT),
    };
  }

  private convertImprintToImprintRawValue(
    imprint: IImprint | (Partial<NewImprint> & ImprintFormDefaults),
  ): ImprintFormRawValue | PartialWithRequiredKeyOf<NewImprintFormRawValue> {
    return {
      ...imprint,
      createdDate: imprint.createdDate ? imprint.createdDate.format(DATE_TIME_FORMAT) : undefined,
      modifiedDate: imprint.modifiedDate ? imprint.modifiedDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
