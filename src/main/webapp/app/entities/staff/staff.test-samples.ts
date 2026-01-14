import dayjs from 'dayjs/esm';

import { IStaff, NewStaff } from './staff.model';

export const sampleWithRequiredData: IStaff = {
  id: 'c180e729-26c3-40b5-8d27-bb5d37b30783',
  email: 'SmnU',
  documentType: 'VOTER_ID',
};

export const sampleWithPartialData: IStaff = {
  id: '5b0875eb-a5d5-475a-9897-9c20d7ffe087',
  email: 'S0',
  streetAddress: 'abaft within',
  town: 'pace broadly',
  district: 'position',
  region: 'demanding mmm',
  digitalProfile: '../fake-data/blob/hipster.png',
  digitalProfileContentType: 'unknown',
  createdDate: dayjs('2024-04-09T23:14'),
  modifiedDate: dayjs('2024-04-09T22:50'),
  documentType: 'NATIONAL_ID',
};

export const sampleWithFullData: IStaff = {
  id: '9089fee8-c560-42dc-96b0-7d2a9f353c68',
  firstName: 'Yvonne',
  lastName: 'Balistreri',
  dateOfBirth: dayjs('2024-04-10'),
  email: 'k',
  digitalAddress: 'nor',
  streetAddress: 'escape while inasmuch',
  postalAddress: 'indeed',
  town: 'past',
  district: 'roughly',
  city: 'North Garrisonview',
  region: 'lesson',
  country: 'Iran',
  digitalProfile: '../fake-data/blob/hipster.png',
  digitalProfileContentType: 'unknown',
  accountNumber: 'yum silky',
  accountType: 'times',
  documents: '../fake-data/blob/hipster.png',
  documentsContentType: 'unknown',
  createdDate: dayjs('2024-04-09T22:12'),
  modifiedDate: dayjs('2024-04-10T15:51'),
  lastModifiedBy: 'duh before though',
  documentType: 'NATIONAL_ID',
};

export const sampleWithNewData: NewStaff = {
  email: 'uS6bT',
  documentType: 'PASSPORT',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
