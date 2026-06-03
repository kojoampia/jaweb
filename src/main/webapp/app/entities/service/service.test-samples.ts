import dayjs from 'dayjs/esm';

import { IService, NewService } from './service.model';

export const sampleWithRequiredData: IService = {
  id: 'd7078626-b90f-418b-be9d-51096ad10383',
};

export const sampleWithPartialData: IService = {
  id: '639907da-36fb-497c-a083-714c84ce5fc9',
  name: 'reproachfully whereas',
  createdDate: dayjs('2024-04-10T15:36'),
  modifiedBy: 'yearly ouch',
  contact: 'mechanically deer separate',
};

export const sampleWithFullData: IService = {
  id: '513dd3c3-54d8-4346-9331-0535222655d9',
  name: 'along circa trusty',
  description: 'against toga',
  photo: '../fake-data/blob/hipster.png',
  photoContentType: 'unknown',
  createdDate: dayjs('2024-04-10T02:17'),
  modifiedDate: dayjs('2024-04-10T00:43'),
  createdBy: 'drat',
  modifiedBy: 'till',
  contact: 'round drat',
  url: 'https://wicked-inevitable.org',
  document: '../fake-data/blob/hipster.png',
  documentContentType: 'energetically',
};

export const sampleWithNewData: NewService = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
