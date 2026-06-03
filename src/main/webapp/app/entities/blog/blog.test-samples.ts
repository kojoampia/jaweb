import dayjs from 'dayjs/esm';

import { IBlog, NewBlog } from './blog.model';

export const sampleWithRequiredData: IBlog = {
  id: '97bb01e3-74fc-4c9d-98b7-f907d4267fde',
};

export const sampleWithPartialData: IBlog = {
  id: 'd6fc408d-9fb0-4c81-8d28-addd720a0ffe',
  title: 'ew original',
  content: 'woozy mmm',
  createdDate: dayjs('2024-04-10T10:20'),
  document: '../fake-data/blob/hipster.png',
  documentContentType: 'unknown',
};

export const sampleWithFullData: IBlog = {
  id: '0060497b-2ca1-4bb5-9506-135027b8840b',
  title: 'synergy',
  content: 'since careless indeed',
  createdDate: dayjs('2024-04-09T21:00'),
  modifiedDate: dayjs('2024-04-10T10:46'),
  lastModifiedBy: 'uh-huh exactly however',
  url: 'https://fair-fat.net/',
  document: '../fake-data/blob/hipster.png',
  documentContentType: 'ideal zowie',
};

export const sampleWithNewData: NewBlog = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
