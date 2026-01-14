import { IAuthority, NewAuthority } from './authority.model';

export const sampleWithRequiredData: IAuthority = {
  name: '399af821-c6a0-46b8-8e87-0a5632755117',
};

export const sampleWithPartialData: IAuthority = {
  name: '11163d9a-a058-4ea1-9da7-18ffa546e66a',
};

export const sampleWithFullData: IAuthority = {
  name: 'ceb1944f-d25b-442e-9060-713bae65f8c1',
};

export const sampleWithNewData: NewAuthority = {
  name: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
