import dayjs from 'dayjs/esm';

import { ISlide, NewSlide } from './slide.model';

export const sampleWithRequiredData: ISlide = {
  id: '6e3b7178-4c53-49b8-ae3b-057343ea4b5b',
};

export const sampleWithPartialData: ISlide = {
  id: '55851d04-d0e8-4538-b852-473a1cd44c96',
  photo: '../fake-data/blob/hipster.png',
  photoContentType: 'unknown',
  modifiedDate: dayjs('2024-04-10T00:02'),
};

export const sampleWithFullData: ISlide = {
  id: '2cf8d2ff-7760-4be4-8b60-1969f9846a11',
  title: 'ligate coaxingly',
  description: 'hmph abaft',
  url: 'https://serpentine-biology.name/',
  photo: '../fake-data/blob/hipster.png',
  photoContentType: 'unknown',
  createdDate: dayjs('2024-04-10T08:24'),
  modifiedDate: dayjs('2024-04-10T06:08'),
  createdBy: 'certificate',
  modifiedBy: 'dice woot bait',
};

export const sampleWithNewData: NewSlide = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
