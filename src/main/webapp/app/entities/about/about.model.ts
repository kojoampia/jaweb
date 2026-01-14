import dayjs from 'dayjs/esm';

export interface IAbout {
  id: string;
  title?: string | null;
  content?: string | null;
  language?: string | null;
  createdDate?: dayjs.Dayjs | null;
  modifiedDate?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
}

export type NewAbout = Omit<IAbout, 'id'> & { id: null };
