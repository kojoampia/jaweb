import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IPortfolio, NewPortfolio } from '../portfolio.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPortfolio for edit and NewPortfolioFormGroupInput for create.
 */
type PortfolioFormGroupInput = IPortfolio | PartialWithRequiredKeyOf<NewPortfolio>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IPortfolio | NewPortfolio> = Omit<T, 'createdDate' | 'modifiedDate'> & {
  createdDate?: string | null;
  modifiedDate?: string | null;
};

type PortfolioFormRawValue = FormValueOf<IPortfolio>;

type NewPortfolioFormRawValue = FormValueOf<NewPortfolio>;

type PortfolioFormDefaults = Pick<NewPortfolio, 'id' | 'status' | 'createdDate' | 'modifiedDate'>;

type PortfolioFormGroupContent = {
  id: FormControl<PortfolioFormRawValue['id'] | NewPortfolio['id']>;
  name: FormControl<PortfolioFormRawValue['name']>;
  description: FormControl<PortfolioFormRawValue['description']>;
  url: FormControl<PortfolioFormRawValue['url']>;
  photo: FormControl<PortfolioFormRawValue['photo']>;
  photoContentType: FormControl<PortfolioFormRawValue['photoContentType']>;
  status: FormControl<PortfolioFormRawValue['status']>;
  createdDate: FormControl<PortfolioFormRawValue['createdDate']>;
  modifiedDate: FormControl<PortfolioFormRawValue['modifiedDate']>;
  createdBy: FormControl<PortfolioFormRawValue['createdBy']>;
  modifiedBy: FormControl<PortfolioFormRawValue['modifiedBy']>;
};

export type PortfolioFormGroup = FormGroup<PortfolioFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PortfolioFormService {
  createPortfolioFormGroup(portfolio: PortfolioFormGroupInput = { id: null }): PortfolioFormGroup {
    const portfolioRawValue = this.convertPortfolioToPortfolioRawValue({
      ...this.getFormDefaults(),
      ...portfolio,
    });
    return new FormGroup<PortfolioFormGroupContent>({
      id: new FormControl(
        { value: portfolioRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      name: new FormControl(portfolioRawValue.name),
      description: new FormControl(portfolioRawValue.description),
      url: new FormControl(portfolioRawValue.url),
      photo: new FormControl(portfolioRawValue.photo),
      photoContentType: new FormControl(portfolioRawValue.photoContentType),
      status: new FormControl(portfolioRawValue.status),
      createdDate: new FormControl(portfolioRawValue.createdDate),
      modifiedDate: new FormControl(portfolioRawValue.modifiedDate),
      createdBy: new FormControl(portfolioRawValue.createdBy),
      modifiedBy: new FormControl(portfolioRawValue.modifiedBy),
    });
  }

  getPortfolio(form: PortfolioFormGroup): IPortfolio | NewPortfolio {
    return this.convertPortfolioRawValueToPortfolio(form.getRawValue() as PortfolioFormRawValue | NewPortfolioFormRawValue);
  }

  resetForm(form: PortfolioFormGroup, portfolio: PortfolioFormGroupInput): void {
    const portfolioRawValue = this.convertPortfolioToPortfolioRawValue({ ...this.getFormDefaults(), ...portfolio });
    form.reset(
      {
        ...portfolioRawValue,
        id: { value: portfolioRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): PortfolioFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      status: false,
      createdDate: currentTime,
      modifiedDate: currentTime,
    };
  }

  private convertPortfolioRawValueToPortfolio(rawPortfolio: PortfolioFormRawValue | NewPortfolioFormRawValue): IPortfolio | NewPortfolio {
    return {
      ...rawPortfolio,
      createdDate: dayjs(rawPortfolio.createdDate, DATE_TIME_FORMAT),
      modifiedDate: dayjs(rawPortfolio.modifiedDate, DATE_TIME_FORMAT),
    };
  }

  private convertPortfolioToPortfolioRawValue(
    portfolio: IPortfolio | (Partial<NewPortfolio> & PortfolioFormDefaults),
  ): PortfolioFormRawValue | PartialWithRequiredKeyOf<NewPortfolioFormRawValue> {
    return {
      ...portfolio,
      createdDate: portfolio.createdDate ? portfolio.createdDate.format(DATE_TIME_FORMAT) : undefined,
      modifiedDate: portfolio.modifiedDate ? portfolio.modifiedDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
