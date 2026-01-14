import dayjs from 'dayjs/esm';

import { IAbout, NewAbout } from './about.model';

export const sampleWithRequiredData: IAbout = {
  id: 'f4072b6c-e6eb-48f2-a9d3-a46d76ab08f1',
};

export const sampleWithPartialData: IAbout = {
  id: '2199564f-ad16-43d1-b37f-cd91ba45d786',
  title: 'cannulate',
  content: 'finger and finally',
  createdDate: dayjs('2024-04-10T14:20'),
  modifiedDate: dayjs('2024-04-10T13:42'),
};

export const sampleWithFullData: IAbout = {
  id: '52dbd380-f4c1-4490-9041-d220287d8e80',
  title: 'fisherman haunting',
  content: 'frigid boohoo cuddly',
  language: 'as boastfully',
  createdDate: dayjs('2024-04-10T11:56'),
  modifiedDate: dayjs('2024-04-10T12:10'),
  lastModifiedBy: 'waste',
};

export const sampleWithNewData: NewAbout = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
