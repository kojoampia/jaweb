import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IInformation, NewInformation } from '../information.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IInformation for edit and NewInformationFormGroupInput for create.
 */
type InformationFormGroupInput = IInformation | PartialWithRequiredKeyOf<NewInformation>;

type InformationFormDefaults = Pick<NewInformation, 'id'>;

type InformationFormGroupContent = {
  id: FormControl<IInformation['id'] | NewInformation['id']>;
  content: FormControl<IInformation['content']>;
  title: FormControl<IInformation['title']>;
  brief: FormControl<IInformation['brief']>;
  linkText: FormControl<IInformation['linkText']>;
  link: FormControl<IInformation['link']>;
  url: FormControl<IInformation['url']>;
  document: FormControl<IInformation['document']>;
  documentContentType: FormControl<IInformation['documentContentType']>;
};

export type InformationFormGroup = FormGroup<InformationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class InformationFormService {
  createInformationFormGroup(information: InformationFormGroupInput = { id: null }): InformationFormGroup {
    const informationRawValue = {
      ...this.getFormDefaults(),
      ...information,
    };
    return new FormGroup<InformationFormGroupContent>({
      id: new FormControl(
        { value: informationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      content: new FormControl(informationRawValue.content),
      title: new FormControl(informationRawValue.title),
      brief: new FormControl(informationRawValue.brief),
      linkText: new FormControl(informationRawValue.linkText),
      link: new FormControl(informationRawValue.link),
      url: new FormControl(informationRawValue.url),
      document: new FormControl(informationRawValue.document),
      documentContentType: new FormControl(informationRawValue.documentContentType),
    });
  }

  getInformation(form: InformationFormGroup): IInformation | NewInformation {
    return form.getRawValue() as IInformation | NewInformation;
  }

  resetForm(form: InformationFormGroup, information: InformationFormGroupInput): void {
    const informationRawValue = { ...this.getFormDefaults(), ...information };
    form.reset(
      {
        ...informationRawValue,
        id: { value: informationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): InformationFormDefaults {
    return {
      id: null,
    };
  }
}
