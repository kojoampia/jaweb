import dayjs from 'dayjs/esm';

import { IContactMessage, NewContactMessage } from './contact-message.model';

export const sampleWithRequiredData: IContactMessage = {
  id: '5c5c5f3d-6c96-4e8b-8ec0-3346f08d4162',
  email: 'LFb',
  title: 'commercialize spherical',
  message: 'sauerkraut hm the',
};

export const sampleWithPartialData: IContactMessage = {
  id: 'a20cfa74-a325-4e9a-a38f-1ab7ed51c3aa',
  email: 'Xiiy',
  title: 'and novel brr',
  message: 'generous a',
};

export const sampleWithFullData: IContactMessage = {
  id: '4e1e999e-662b-4054-8a1b-8a06a696c2fc',
  name: 'consequently',
  email: 'lRgU',
  title: 'failing out including',
  message: 'definitive amongst whoa',
  createdDate: dayjs('2024-04-10T08:32'),
};

export const sampleWithNewData: NewContactMessage = {
  email: 'XJ',
  title: 'bludge',
  message: 'uncomfortable',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
