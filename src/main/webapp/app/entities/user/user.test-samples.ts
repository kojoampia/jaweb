import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 'cb9b3437-c746-4c30-ae3b-e3c7893516c5',
  login: 'g-.Ir',
};

export const sampleWithPartialData: IUser = {
  id: '3c5467fb-ecd5-43b9-b611-d2a1edf0e3c8',
  login: 'tl1',
};

export const sampleWithFullData: IUser = {
  id: '87792f01-ac46-445c-83f2-aaf132304152',
  login: 'cMqeDW',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
