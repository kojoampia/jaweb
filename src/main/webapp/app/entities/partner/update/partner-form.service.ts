import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IPartner, NewPartner } from '../partner.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPartner for edit and NewPartnerFormGroupInput for create.
 */
type PartnerFormGroupInput = IPartner | PartialWithRequiredKeyOf<NewPartner>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IPartner | NewPartner> = Omit<T, 'createdDate'> & {
  createdDate?: string | null;
};

type PartnerFormRawValue = FormValueOf<IPartner>;

type NewPartnerFormRawValue = FormValueOf<NewPartner>;

type PartnerFormDefaults = Pick<NewPartner, 'id' | 'createdDate'>;

type PartnerFormGroupContent = {
  id: FormControl<PartnerFormRawValue['id'] | NewPartner['id']>;
  name: FormControl<PartnerFormRawValue['name']>;
  link: FormControl<PartnerFormRawValue['link']>;
  logo: FormControl<PartnerFormRawValue['logo']>;
  logoContentType: FormControl<PartnerFormRawValue['logoContentType']>;
  country: FormControl<PartnerFormRawValue['country']>;
  location: FormControl<PartnerFormRawValue['location']>;
  postCode: FormControl<PartnerFormRawValue['postCode']>;
  streetAddress: FormControl<PartnerFormRawValue['streetAddress']>;
  email: FormControl<PartnerFormRawValue['email']>;
  contactPerson: FormControl<PartnerFormRawValue['contactPerson']>;
  logoUrl: FormControl<PartnerFormRawValue['logoUrl']>;
  createdDate: FormControl<PartnerFormRawValue['createdDate']>;
};

export type PartnerFormGroup = FormGroup<PartnerFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PartnerFormService {
  createPartnerFormGroup(partner: PartnerFormGroupInput = { id: null }): PartnerFormGroup {
    const partnerRawValue = this.convertPartnerToPartnerRawValue({
      ...this.getFormDefaults(),
      ...partner,
    });
    return new FormGroup<PartnerFormGroupContent>({
      id: new FormControl(
        { value: partnerRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      name: new FormControl(partnerRawValue.name),
      link: new FormControl(partnerRawValue.link),
      logo: new FormControl(partnerRawValue.logo),
      logoContentType: new FormControl(partnerRawValue.logoContentType),
      country: new FormControl(partnerRawValue.country),
      location: new FormControl(partnerRawValue.location),
      postCode: new FormControl(partnerRawValue.postCode),
      streetAddress: new FormControl(partnerRawValue.streetAddress),
      email: new FormControl(partnerRawValue.email, {
        validators: [
          Validators.required,
          Validators.pattern(
            '/^(([^&lt;&gt;()\\[\\]\\\\.,;:\\s@&#34;]+(\\.[^&lt;&gt;()\\[\\]\\\\.,;:\\s@&#34;]+)*)|(&#34;.+&#34;))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/',
          ),
        ],
      }),
      contactPerson: new FormControl(partnerRawValue.contactPerson, {
        validators: [Validators.required],
      }),
      logoUrl: new FormControl(partnerRawValue.logoUrl),
      createdDate: new FormControl(partnerRawValue.createdDate),
    });
  }

  getPartner(form: PartnerFormGroup): IPartner | NewPartner {
    return this.convertPartnerRawValueToPartner(form.getRawValue() as PartnerFormRawValue | NewPartnerFormRawValue);
  }

  resetForm(form: PartnerFormGroup, partner: PartnerFormGroupInput): void {
    const partnerRawValue = this.convertPartnerToPartnerRawValue({ ...this.getFormDefaults(), ...partner });
    form.reset(
      {
        ...partnerRawValue,
        id: { value: partnerRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): PartnerFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdDate: currentTime,
    };
  }

  private convertPartnerRawValueToPartner(rawPartner: PartnerFormRawValue | NewPartnerFormRawValue): IPartner | NewPartner {
    return {
      ...rawPartner,
      createdDate: dayjs(rawPartner.createdDate, DATE_TIME_FORMAT),
    };
  }

  private convertPartnerToPartnerRawValue(
    partner: IPartner | (Partial<NewPartner> & PartnerFormDefaults),
  ): PartnerFormRawValue | PartialWithRequiredKeyOf<NewPartnerFormRawValue> {
    return {
      ...partner,
      createdDate: partner.createdDate ? partner.createdDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
