import dayjs from 'dayjs/esm';

export interface ICareer {
  id: string;
  name?: string | null;
  description?: string | null;
  department?: string | null;
  createdDate?: dayjs.Dayjs | null;
  modifiedDate?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
  url?: string | null;
  document?: string | null;
  documentContentType?: string | null;
}

export type NewCareer = Omit<ICareer, 'id'> & { id: null };
