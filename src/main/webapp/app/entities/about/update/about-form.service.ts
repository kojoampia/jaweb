import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IAbout, NewAbout } from '../about.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAbout for edit and NewAboutFormGroupInput for create.
 */
type AboutFormGroupInput = IAbout | PartialWithRequiredKeyOf<NewAbout>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IAbout | NewAbout> = Omit<T, 'createdDate' | 'modifiedDate'> & {
  createdDate?: string | null;
  modifiedDate?: string | null;
};

type AboutFormRawValue = FormValueOf<IAbout>;

type NewAboutFormRawValue = FormValueOf<NewAbout>;

type AboutFormDefaults = Pick<NewAbout, 'id' | 'createdDate' | 'modifiedDate'>;

type AboutFormGroupContent = {
  id: FormControl<AboutFormRawValue['id'] | NewAbout['id']>;
  title: FormControl<AboutFormRawValue['title']>;
  content: FormControl<AboutFormRawValue['content']>;
  language: FormControl<AboutFormRawValue['language']>;
  createdDate: FormControl<AboutFormRawValue['createdDate']>;
  modifiedDate: FormControl<AboutFormRawValue['modifiedDate']>;
  lastModifiedBy: FormControl<AboutFormRawValue['lastModifiedBy']>;
};

export type AboutFormGroup = FormGroup<AboutFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AboutFormService {
  createAboutFormGroup(about: AboutFormGroupInput = { id: null }): AboutFormGroup {
    const aboutRawValue = this.convertAboutToAboutRawValue({
      ...this.getFormDefaults(),
      ...about,
    });
    return new FormGroup<AboutFormGroupContent>({
      id: new FormControl(
        { value: aboutRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      title: new FormControl(aboutRawValue.title),
      content: new FormControl(aboutRawValue.content),
      language: new FormControl(aboutRawValue.language),
      createdDate: new FormControl(aboutRawValue.createdDate),
      modifiedDate: new FormControl(aboutRawValue.modifiedDate),
      lastModifiedBy: new FormControl(aboutRawValue.lastModifiedBy),
    });
  }

  getAbout(form: AboutFormGroup): IAbout | NewAbout {
    return this.convertAboutRawValueToAbout(form.getRawValue() as AboutFormRawValue | NewAboutFormRawValue);
  }

  resetForm(form: AboutFormGroup, about: AboutFormGroupInput): void {
    const aboutRawValue = this.convertAboutToAboutRawValue({ ...this.getFormDefaults(), ...about });
    form.reset(
      {
        ...aboutRawValue,
        id: { value: aboutRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): AboutFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdDate: currentTime,
      modifiedDate: currentTime,
    };
  }

  private convertAboutRawValueToAbout(rawAbout: AboutFormRawValue | NewAboutFormRawValue): IAbout | NewAbout {
    return {
      ...rawAbout,
      createdDate: dayjs(rawAbout.createdDate, DATE_TIME_FORMAT),
      modifiedDate: dayjs(rawAbout.modifiedDate, DATE_TIME_FORMAT),
    };
  }

  private convertAboutToAboutRawValue(
    about: IAbout | (Partial<NewAbout> & AboutFormDefaults),
  ): AboutFormRawValue | PartialWithRequiredKeyOf<NewAboutFormRawValue> {
    return {
      ...about,
      createdDate: about.createdDate ? about.createdDate.format(DATE_TIME_FORMAT) : undefined,
      modifiedDate: about.modifiedDate ? about.modifiedDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
