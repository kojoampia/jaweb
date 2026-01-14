import dayjs from 'dayjs/esm';

import { IPartner, NewPartner } from './partner.model';

export const sampleWithRequiredData: IPartner = {
  id: '689c6da9-8a35-447d-bbb4-e097f2b91f8d',
  email: undefined,
  contactPerson: 'once amidst',
};

export const sampleWithPartialData: IPartner = {
  id: '4e2cdd22-deba-4185-b397-07a358057efc',
  link: 'bouncy technique now',
  country: 'Sweden',
  postCode: '15741-2815',
  email: undefined,
  contactPerson: 'cool speedily lick',
  logoUrl: 'earnings gerrymander',
  createdDate: dayjs('2024-04-09T21:36'),
};

export const sampleWithFullData: IPartner = {
  id: '4737d441-61ee-46aa-bd60-629e81c919fb',
  name: 'sentimental bathrobe disinfect',
  link: 'languish',
  logo: '../fake-data/blob/hipster.png',
  logoContentType: 'unknown',
  country: 'Guernsey',
  location: 'veal definitive',
  postCode: '77504-0116',
  streetAddress: 'worth',
  email: undefined,
  contactPerson: 'blind inside',
  logoUrl: 'phony variable accidentally',
  createdDate: dayjs('2024-04-10T11:19'),
};

export const sampleWithNewData: NewPartner = {
  email: undefined,
  contactPerson: 'mysterious',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
