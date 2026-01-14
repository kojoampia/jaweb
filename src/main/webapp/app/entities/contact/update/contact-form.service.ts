import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IContact, NewContact } from '../contact.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IContact for edit and NewContactFormGroupInput for create.
 */
type ContactFormGroupInput = IContact | PartialWithRequiredKeyOf<NewContact>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IContact | NewContact> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

type ContactFormRawValue = FormValueOf<IContact>;

type NewContactFormRawValue = FormValueOf<NewContact>;

type ContactFormDefaults = Pick<NewContact, 'id' | 'lastModified'>;

type ContactFormGroupContent = {
  id: FormControl<ContactFormRawValue['id'] | NewContact['id']>;
  title: FormControl<ContactFormRawValue['title']>;
  address: FormControl<ContactFormRawValue['address']>;
  street: FormControl<ContactFormRawValue['street']>;
  code: FormControl<ContactFormRawValue['code']>;
  city: FormControl<ContactFormRawValue['city']>;
  state: FormControl<ContactFormRawValue['state']>;
  region: FormControl<ContactFormRawValue['region']>;
  country: FormControl<ContactFormRawValue['country']>;
  telephone: FormControl<ContactFormRawValue['telephone']>;
  email: FormControl<ContactFormRawValue['email']>;
  whatsapp: FormControl<ContactFormRawValue['whatsapp']>;
  facebook: FormControl<ContactFormRawValue['facebook']>;
  twitter: FormControl<ContactFormRawValue['twitter']>;
  google: FormControl<ContactFormRawValue['google']>;
  youtube: FormControl<ContactFormRawValue['youtube']>;
  lastModified: FormControl<ContactFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<ContactFormRawValue['lastModifiedBy']>;
  language: FormControl<ContactFormRawValue['language']>;
  appointment: FormControl<ContactFormRawValue['appointment']>;
  latitude: FormControl<ContactFormRawValue['latitude']>;
  longitude: FormControl<ContactFormRawValue['longitude']>;
  image: FormControl<ContactFormRawValue['image']>;
  imageContentType: FormControl<ContactFormRawValue['imageContentType']>;
  url: FormControl<ContactFormRawValue['url']>;
};

export type ContactFormGroup = FormGroup<ContactFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ContactFormService {
  createContactFormGroup(contact: ContactFormGroupInput = { id: null }): ContactFormGroup {
    const contactRawValue = this.convertContactToContactRawValue({
      ...this.getFormDefaults(),
      ...contact,
    });
    return new FormGroup<ContactFormGroupContent>({
      id: new FormControl(
        { value: contactRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      title: new FormControl(contactRawValue.title),
      address: new FormControl(contactRawValue.address),
      street: new FormControl(contactRawValue.street),
      code: new FormControl(contactRawValue.code),
      city: new FormControl(contactRawValue.city),
      state: new FormControl(contactRawValue.state),
      region: new FormControl(contactRawValue.region),
      country: new FormControl(contactRawValue.country),
      telephone: new FormControl(contactRawValue.telephone),
      email: new FormControl(contactRawValue.email, {
        validators: [Validators.required, Validators.pattern('')],
      }),
      whatsapp: new FormControl(contactRawValue.whatsapp),
      facebook: new FormControl(contactRawValue.facebook),
      twitter: new FormControl(contactRawValue.twitter),
      google: new FormControl(contactRawValue.google),
      youtube: new FormControl(contactRawValue.youtube),
      lastModified: new FormControl(contactRawValue.lastModified),
      lastModifiedBy: new FormControl(contactRawValue.lastModifiedBy),
      language: new FormControl(contactRawValue.language),
      appointment: new FormControl(contactRawValue.appointment),
      latitude: new FormControl(contactRawValue.latitude),
      longitude: new FormControl(contactRawValue.longitude),
      image: new FormControl(contactRawValue.image),
      imageContentType: new FormControl(contactRawValue.imageContentType),
      url: new FormControl(contactRawValue.url),
    });
  }

  getContact(form: ContactFormGroup): IContact | NewContact {
    return this.convertContactRawValueToContact(form.getRawValue() as ContactFormRawValue | NewContactFormRawValue);
  }

  resetForm(form: ContactFormGroup, contact: ContactFormGroupInput): void {
    const contactRawValue = this.convertContactToContactRawValue({ ...this.getFormDefaults(), ...contact });
    form.reset(
      {
        ...contactRawValue,
        id: { value: contactRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ContactFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      lastModified: currentTime,
    };
  }

  private convertContactRawValueToContact(rawContact: ContactFormRawValue | NewContactFormRawValue): IContact | NewContact {
    return {
      ...rawContact,
      lastModified: dayjs(rawContact.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertContactToContactRawValue(
    contact: IContact | (Partial<NewContact> & ContactFormDefaults),
  ): ContactFormRawValue | PartialWithRequiredKeyOf<NewContactFormRawValue> {
    return {
      ...contact,
      lastModified: contact.lastModified ? contact.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
