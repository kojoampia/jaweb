import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ISlide, NewSlide } from '../slide.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISlide for edit and NewSlideFormGroupInput for create.
 */
type SlideFormGroupInput = ISlide | PartialWithRequiredKeyOf<NewSlide>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ISlide | NewSlide> = Omit<T, 'createdDate' | 'modifiedDate'> & {
  createdDate?: string | null;
  modifiedDate?: string | null;
};

type SlideFormRawValue = FormValueOf<ISlide>;

type NewSlideFormRawValue = FormValueOf<NewSlide>;

type SlideFormDefaults = Pick<NewSlide, 'id' | 'createdDate' | 'modifiedDate'>;

type SlideFormGroupContent = {
  id: FormControl<SlideFormRawValue['id'] | NewSlide['id']>;
  title: FormControl<SlideFormRawValue['title']>;
  description: FormControl<SlideFormRawValue['description']>;
  url: FormControl<SlideFormRawValue['url']>;
  photo: FormControl<SlideFormRawValue['photo']>;
  photoContentType: FormControl<SlideFormRawValue['photoContentType']>;
  createdDate: FormControl<SlideFormRawValue['createdDate']>;
  modifiedDate: FormControl<SlideFormRawValue['modifiedDate']>;
  createdBy: FormControl<SlideFormRawValue['createdBy']>;
  modifiedBy: FormControl<SlideFormRawValue['modifiedBy']>;
  about: FormControl<SlideFormRawValue['about']>;
  blog: FormControl<SlideFormRawValue['blog']>;
};

export type SlideFormGroup = FormGroup<SlideFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SlideFormService {
  createSlideFormGroup(slide: SlideFormGroupInput = { id: null }): SlideFormGroup {
    const slideRawValue = this.convertSlideToSlideRawValue({
      ...this.getFormDefaults(),
      ...slide,
    });
    return new FormGroup<SlideFormGroupContent>({
      id: new FormControl(
        { value: slideRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      title: new FormControl(slideRawValue.title),
      description: new FormControl(slideRawValue.description),
      url: new FormControl(slideRawValue.url),
      photo: new FormControl(slideRawValue.photo),
      photoContentType: new FormControl(slideRawValue.photoContentType),
      createdDate: new FormControl(slideRawValue.createdDate),
      modifiedDate: new FormControl(slideRawValue.modifiedDate),
      createdBy: new FormControl(slideRawValue.createdBy),
      modifiedBy: new FormControl(slideRawValue.modifiedBy),
      about: new FormControl(slideRawValue.about),
      blog: new FormControl(slideRawValue.blog),
    });
  }

  getSlide(form: SlideFormGroup): ISlide | NewSlide {
    return this.convertSlideRawValueToSlide(form.getRawValue() as SlideFormRawValue | NewSlideFormRawValue);
  }

  resetForm(form: SlideFormGroup, slide: SlideFormGroupInput): void {
    const slideRawValue = this.convertSlideToSlideRawValue({ ...this.getFormDefaults(), ...slide });
    form.reset(
      {
        ...slideRawValue,
        id: { value: slideRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): SlideFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdDate: currentTime,
      modifiedDate: currentTime,
    };
  }

  private convertSlideRawValueToSlide(rawSlide: SlideFormRawValue | NewSlideFormRawValue): ISlide | NewSlide {
    return {
      ...rawSlide,
      createdDate: dayjs(rawSlide.createdDate, DATE_TIME_FORMAT),
      modifiedDate: dayjs(rawSlide.modifiedDate, DATE_TIME_FORMAT),
    };
  }

  private convertSlideToSlideRawValue(
    slide: ISlide | (Partial<NewSlide> & SlideFormDefaults),
  ): SlideFormRawValue | PartialWithRequiredKeyOf<NewSlideFormRawValue> {
    return {
      ...slide,
      createdDate: slide.createdDate ? slide.createdDate.format(DATE_TIME_FORMAT) : undefined,
      modifiedDate: slide.modifiedDate ? slide.modifiedDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
