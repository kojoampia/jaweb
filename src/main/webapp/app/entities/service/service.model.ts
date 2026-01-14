import dayjs from 'dayjs/esm';

export interface IService {
  id: string;
  name?: string | null;
  description?: string | null;
  photo?: string | null;
  photoContentType?: string | null;
  createdDate?: dayjs.Dayjs | null;
  modifiedDate?: dayjs.Dayjs | null;
  createdBy?: string | null;
  modifiedBy?: string | null;
  contact?: string | null;
  url?: string | null;
  document?: string | null;
  documentContentType?: string | null;
}

export type NewService = Omit<IService, 'id'> & { id: null };
