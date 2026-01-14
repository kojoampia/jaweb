import dayjs from 'dayjs/esm';

import { IPrivilege, NewPrivilege } from './privilege.model';

export const sampleWithRequiredData: IPrivilege = {
  id: 'fede04e1-c8d7-4f22-bd68-57b5f1c89aa9',
};

export const sampleWithPartialData: IPrivilege = {
  id: 'ac682fb3-8fa7-4333-8283-f1b2bef09815',
  createdDate: dayjs('2024-04-10T02:17'),
};

export const sampleWithFullData: IPrivilege = {
  id: 'e4c22111-6aea-4919-af6e-fc4854cdd812',
  name: 'because considering',
  createdDate: dayjs('2024-04-09T22:45'),
  createdBy: 'viciously tatami like',
};

export const sampleWithNewData: NewPrivilege = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
