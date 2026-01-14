import dayjs from 'dayjs/esm';

import { IImprint, NewImprint } from './imprint.model';

export const sampleWithRequiredData: IImprint = {
  id: 'c0e5af3e-cfbc-4e3f-b5b6-0b0dfc1be05b',
};

export const sampleWithPartialData: IImprint = {
  id: 'f9b4223a-dec7-4603-a5fb-a4af84b57b49',
  title: 'webbed so',
  slides: 'proud undershoot',
  modifiedDate: dayjs('2024-04-10T09:47'),
  lastModifiedBy: 'foolishly wrinkle but',
};

export const sampleWithFullData: IImprint = {
  id: 'e7f2b4dd-a71e-4853-a031-1e6afabd05e5',
  title: 'combination healthily dental',
  content: 'sleepily enchanted',
  slides: 'party among yippee',
  createdDate: dayjs('2024-04-10T15:30'),
  modifiedDate: dayjs('2024-04-10T05:24'),
  lastModifiedBy: 'safe',
};

export const sampleWithNewData: NewImprint = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
