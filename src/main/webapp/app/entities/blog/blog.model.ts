import dayjs from 'dayjs/esm';

export interface IBlog {
  id: string;
  title?: string | null;
  content?: string | null;
  createdDate?: dayjs.Dayjs | null;
  modifiedDate?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
  url?: string | null;
  document?: string | null;
  documentContentType?: string | null;
}

export type NewBlog = Omit<IBlog, 'id'> & { id: null };
