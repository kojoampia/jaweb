import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IContactMessage, NewContactMessage } from '../contact-message.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IContactMessage for edit and NewContactMessageFormGroupInput for create.
 */
type ContactMessageFormGroupInput = IContactMessage | PartialWithRequiredKeyOf<NewContactMessage>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IContactMessage | NewContactMessage> = Omit<T, 'createdDate'> & {
  createdDate?: string | null;
};

type ContactMessageFormRawValue = FormValueOf<IContactMessage>;

type NewContactMessageFormRawValue = FormValueOf<NewContactMessage>;

type ContactMessageFormDefaults = Pick<NewContactMessage, 'id' | 'createdDate'>;

type ContactMessageFormGroupContent = {
  id: FormControl<ContactMessageFormRawValue['id'] | NewContactMessage['id']>;
  name: FormControl<ContactMessageFormRawValue['name']>;
  email: FormControl<ContactMessageFormRawValue['email']>;
  title: FormControl<ContactMessageFormRawValue['title']>;
  message: FormControl<ContactMessageFormRawValue['message']>;
  createdDate: FormControl<ContactMessageFormRawValue['createdDate']>;
  contact: FormControl<ContactMessageFormRawValue['contact']>;
};

export type ContactMessageFormGroup = FormGroup<ContactMessageFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ContactMessageFormService {
  createContactMessageFormGroup(contactMessage: ContactMessageFormGroupInput = { id: null }): ContactMessageFormGroup {
    const contactMessageRawValue = this.convertContactMessageToContactMessageRawValue({
      ...this.getFormDefaults(),
      ...contactMessage,
    });
    return new FormGroup<ContactMessageFormGroupContent>({
      id: new FormControl(
        { value: contactMessageRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      name: new FormControl(contactMessageRawValue.name),
      email: new FormControl(contactMessageRawValue.email, {
        validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')],
      }),
      title: new FormControl(contactMessageRawValue.title, {
        validators: [Validators.required],
      }),
      message: new FormControl(contactMessageRawValue.message, {
        validators: [Validators.required],
      }),
      createdDate: new FormControl(contactMessageRawValue.createdDate),
      contact: new FormControl(contactMessageRawValue.contact),
    });
  }

  getContactMessage(form: ContactMessageFormGroup): IContactMessage | NewContactMessage {
    return this.convertContactMessageRawValueToContactMessage(
      form.getRawValue() as ContactMessageFormRawValue | NewContactMessageFormRawValue,
    );
  }

  resetForm(form: ContactMessageFormGroup, contactMessage: ContactMessageFormGroupInput): void {
    const contactMessageRawValue = this.convertContactMessageToContactMessageRawValue({ ...this.getFormDefaults(), ...contactMessage });
    form.reset(
      {
        ...contactMessageRawValue,
        id: { value: contactMessageRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ContactMessageFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdDate: currentTime,
    };
  }

  private convertContactMessageRawValueToContactMessage(
    rawContactMessage: ContactMessageFormRawValue | NewContactMessageFormRawValue,
  ): IContactMessage | NewContactMessage {
    return {
      ...rawContactMessage,
      createdDate: dayjs(rawContactMessage.createdDate, DATE_TIME_FORMAT),
    };
  }

  private convertContactMessageToContactMessageRawValue(
    contactMessage: IContactMessage | (Partial<NewContactMessage> & ContactMessageFormDefaults),
  ): ContactMessageFormRawValue | PartialWithRequiredKeyOf<NewContactMessageFormRawValue> {
    return {
      ...contactMessage,
      createdDate: contactMessage.createdDate ? contactMessage.createdDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
