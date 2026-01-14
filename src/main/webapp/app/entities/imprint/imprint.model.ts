import dayjs from 'dayjs/esm';

export interface IImprint {
  id: string;
  title?: string | null;
  content?: string | null;
  slides?: string | null;
  createdDate?: dayjs.Dayjs | null;
  modifiedDate?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
}

export type NewImprint = Omit<IImprint, 'id'> & { id: null };
