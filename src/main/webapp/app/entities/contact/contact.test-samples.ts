import dayjs from 'dayjs/esm';

import { IContact, NewContact } from './contact.model';

export const sampleWithRequiredData: IContact = {
  id: '467f4abe-870c-481e-bfd4-9e474ff7cc96',
  email: undefined,
};

export const sampleWithPartialData: IContact = {
  id: 'c40715d3-b3e4-47f5-ac63-ba1bbe98e468',
  title: 'oh worst bleak',
  address: 'versus about',
  street: 'The Lane',
  code: 'dark phew',
  state: 'supposing bowler',
  region: 'about happily',
  country: 'Curacao',
  telephone: '560-770-2748 x394',
  email: undefined,
  facebook: 'wherever',
  twitter: 'answer shine',
  google: 'glaze',
  youtube: 'pish',
  lastModified: dayjs('2024-04-09T23:20'),
  language: 'streak aw ew',
  latitude: 20587.46,
  longitude: 25432.02,
  image: '../fake-data/blob/hipster.png',
  imageContentType: 'unknown',
  url: 'https://speedy-prescription.biz',
};

export const sampleWithFullData: IContact = {
  id: 'ad241e4a-fdf9-4b66-8969-8759e3dd2704',
  title: 'slow purvey',
  address: 'whenever soup ouch',
  street: 'Depot Street',
  code: 'geez',
  city: 'West Nicklausburgh',
  state: 'unselfish',
  region: 'vice sympathy boohoo',
  country: 'Portugal',
  telephone: '669-334-3622 x651',
  email: undefined,
  whatsapp: 'unpick mysteriously',
  facebook: 'ew phooey afore',
  twitter: 'diligently when',
  google: 'slowly situation',
  youtube: 'what above quizzically',
  lastModified: dayjs('2024-04-10T02:07'),
  lastModifiedBy: 'commonsense angelic',
  language: 'inside near blah',
  appointment: 'to phooey pro',
  latitude: 14878.31,
  longitude: 7907.81,
  image: '../fake-data/blob/hipster.png',
  imageContentType: 'unknown',
  url: 'https://lazy-medium.biz/',
};

export const sampleWithNewData: NewContact = {
  email: undefined,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
