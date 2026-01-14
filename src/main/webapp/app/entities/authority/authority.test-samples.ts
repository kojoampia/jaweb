import { IAuthority, NewAuthority } from './authority.model';

export const sampleWithRequiredData: IAuthority = {
  name: '0f197206-d309-4608-986e-3f52b1edf141',
};

export const sampleWithPartialData: IAuthority = {
  name: 'e612a50a-2e07-461a-aba4-54346e62d538',
};

export const sampleWithFullData: IAuthority = {
  name: 'c1666e41-0efb-41ab-9f78-3df695cb9421',
};

export const sampleWithNewData: NewAuthority = {
  name: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
