import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IService, NewService } from '../service.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IService for edit and NewServiceFormGroupInput for create.
 */
type ServiceFormGroupInput = IService | PartialWithRequiredKeyOf<NewService>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IService | NewService> = Omit<T, 'createdDate' | 'modifiedDate'> & {
  createdDate?: string | null;
  modifiedDate?: string | null;
};

type ServiceFormRawValue = FormValueOf<IService>;

type NewServiceFormRawValue = FormValueOf<NewService>;

type ServiceFormDefaults = Pick<NewService, 'id' | 'createdDate' | 'modifiedDate'>;

type ServiceFormGroupContent = {
  id: FormControl<ServiceFormRawValue['id'] | NewService['id']>;
  name: FormControl<ServiceFormRawValue['name']>;
  description: FormControl<ServiceFormRawValue['description']>;
  photo: FormControl<ServiceFormRawValue['photo']>;
  photoContentType: FormControl<ServiceFormRawValue['photoContentType']>;
  createdDate: FormControl<ServiceFormRawValue['createdDate']>;
  modifiedDate: FormControl<ServiceFormRawValue['modifiedDate']>;
  createdBy: FormControl<ServiceFormRawValue['createdBy']>;
  modifiedBy: FormControl<ServiceFormRawValue['modifiedBy']>;
  contact: FormControl<ServiceFormRawValue['contact']>;
  url: FormControl<ServiceFormRawValue['url']>;
  document: FormControl<ServiceFormRawValue['document']>;
  documentContentType: FormControl<ServiceFormRawValue['documentContentType']>;
};

export type ServiceFormGroup = FormGroup<ServiceFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ServiceFormService {
  createServiceFormGroup(service: ServiceFormGroupInput = { id: null }): ServiceFormGroup {
    const serviceRawValue = this.convertServiceToServiceRawValue({
      ...this.getFormDefaults(),
      ...service,
    });
    return new FormGroup<ServiceFormGroupContent>({
      id: new FormControl(
        { value: serviceRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      name: new FormControl(serviceRawValue.name),
      description: new FormControl(serviceRawValue.description),
      photo: new FormControl(serviceRawValue.photo),
      photoContentType: new FormControl(serviceRawValue.photoContentType),
      createdDate: new FormControl(serviceRawValue.createdDate),
      modifiedDate: new FormControl(serviceRawValue.modifiedDate),
      createdBy: new FormControl(serviceRawValue.createdBy),
      modifiedBy: new FormControl(serviceRawValue.modifiedBy),
      contact: new FormControl(serviceRawValue.contact),
      url: new FormControl(serviceRawValue.url),
      document: new FormControl(serviceRawValue.document),
      documentContentType: new FormControl(serviceRawValue.documentContentType),
    });
  }

  getService(form: ServiceFormGroup): IService | NewService {
    return this.convertServiceRawValueToService(form.getRawValue() as ServiceFormRawValue | NewServiceFormRawValue);
  }

  resetForm(form: ServiceFormGroup, service: ServiceFormGroupInput): void {
    const serviceRawValue = this.convertServiceToServiceRawValue({ ...this.getFormDefaults(), ...service });
    form.reset(
      {
        ...serviceRawValue,
        id: { value: serviceRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ServiceFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdDate: currentTime,
      modifiedDate: currentTime,
    };
  }

  private convertServiceRawValueToService(rawService: ServiceFormRawValue | NewServiceFormRawValue): IService | NewService {
    return {
      ...rawService,
      createdDate: dayjs(rawService.createdDate, DATE_TIME_FORMAT),
      modifiedDate: dayjs(rawService.modifiedDate, DATE_TIME_FORMAT),
    };
  }

  private convertServiceToServiceRawValue(
    service: IService | (Partial<NewService> & ServiceFormDefaults),
  ): ServiceFormRawValue | PartialWithRequiredKeyOf<NewServiceFormRawValue> {
    return {
      ...service,
      createdDate: service.createdDate ? service.createdDate.format(DATE_TIME_FORMAT) : undefined,
      modifiedDate: service.modifiedDate ? service.modifiedDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
