import dayjs from 'dayjs/esm';

import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: 'c65efc55-cb21-4cec-8ea3-b7da41ea1e71',
};

export const sampleWithPartialData: IProduct = {
  id: '5f87edd4-8a47-4309-8b82-58724b00231c',
  name: 'undergo',
  category: 'unkempt',
  modifiedDate: dayjs('2024-04-10T12:17'),
  document: '../fake-data/blob/hipster.png',
  documentContentType: 'unknown',
  documentContentType: 'undulate doze polarize',
};

export const sampleWithFullData: IProduct = {
  id: 'd2f23227-e701-434e-9b90-49cda2c5fc9c',
  name: 'bond blind whereas',
  description: 'stand barn and',
  price: 3449.06,
  photo: '../fake-data/blob/hipster.png',
  photoContentType: 'unknown',
  category: 'complicate zip',
  createdDate: dayjs('2024-04-10T15:33'),
  modifiedDate: dayjs('2024-04-10T17:01'),
  lastModifiedBy: 'splendid',
  url: 'https://bite-sized-filly.com',
  document: '../fake-data/blob/hipster.png',
  documentContentType: 'unknown',
  documentContentType: 'adduce as',
};

export const sampleWithNewData: NewProduct = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
