import dayjs from 'dayjs/esm';

import { IPortfolio, NewPortfolio } from './portfolio.model';

export const sampleWithRequiredData: IPortfolio = {
  id: 'e4438a8d-e81b-4233-b297-58ff77ca8bb1',
};

export const sampleWithPartialData: IPortfolio = {
  id: 'c077a97a-4bb5-431b-8472-bbe67ad1a110',
  url: 'https://lazy-gig.info',
  status: true,
  createdDate: dayjs('2024-04-10T01:21'),
  createdBy: 'whose tangible whoever',
  modifiedBy: 'despite helpfully',
};

export const sampleWithFullData: IPortfolio = {
  id: '6a2e8d80-823d-43cc-83a6-ba1d9d65cd0e',
  name: 'nearly card',
  description: 'upright near',
  url: 'https://finished-moat.info',
  photo: '../fake-data/blob/hipster.png',
  photoContentType: 'unknown',
  status: false,
  createdDate: dayjs('2024-04-10T00:50'),
  modifiedDate: dayjs('2024-04-10T15:55'),
  createdBy: 'wherever',
  modifiedBy: 'but',
};

export const sampleWithNewData: NewPortfolio = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
