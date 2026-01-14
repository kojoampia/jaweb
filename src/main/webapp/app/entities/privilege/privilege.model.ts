import dayjs from 'dayjs/esm';

export interface IPrivilege {
  id: string;
  name?: string | null;
  createdDate?: dayjs.Dayjs | null;
  createdBy?: string | null;
}

export type NewPrivilege = Omit<IPrivilege, 'id'> & { id: null };
