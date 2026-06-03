import dayjs from 'dayjs/esm';

import { ICareer, NewCareer } from './career.model';

export const sampleWithRequiredData: ICareer = {
  id: '4de44057-95a8-4701-b580-b122b88585e2',
};

export const sampleWithPartialData: ICareer = {
  id: '5b541c77-dc33-49db-bbab-04a51a6c6161',
  name: 'how aha',
  department: 'gee',
  modifiedDate: dayjs('2024-04-10T14:42'),
  documentContentType: 'namecheck',
};

export const sampleWithFullData: ICareer = {
  id: 'aefcc674-592a-4676-b46d-76d7d8d24f8d',
  name: 'yieldingly',
  description: 'weekly peddle',
  department: 'intuit',
  createdDate: dayjs('2024-04-10T05:51'),
  modifiedDate: dayjs('2024-04-10T15:14'),
  lastModifiedBy: 'athwart drat soar',
  url: 'https://active-marten.org',
  document: '../fake-data/blob/hipster.png',
  documentContentType: 'lest or',
};

export const sampleWithNewData: NewCareer = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
