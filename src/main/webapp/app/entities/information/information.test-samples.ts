import { IInformation, NewInformation } from './information.model';

export const sampleWithRequiredData: IInformation = {
  id: '09156e8d-91eb-4f8f-b728-90e6ae203976',
};

export const sampleWithPartialData: IInformation = {
  id: 'ef851d0c-b38e-49ff-a2c0-1d954034d278',
  content: 'mister majestically woot',
  title: 'beatboxer',
  brief: 'courageously split compress',
  linkText: 'machine green',
  url: 'https://embarrassed-dynasty.org',
};

export const sampleWithFullData: IInformation = {
  id: '7e8c9cdd-3092-4a9e-b7f4-e405bca8a6a3',
  content: 'favorable',
  title: 'rhinoceros senate yuck',
  brief: 'confer wonderful fooey',
  linkText: 'elide',
  link: 'because refrain despite',
  url: 'https://aromatic-weird.net',
  document: '../fake-data/blob/hipster.png',
  documentContentType: 'clef hmph bandage',
};

export const sampleWithNewData: NewInformation = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
