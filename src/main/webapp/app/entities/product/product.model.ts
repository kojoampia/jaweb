import dayjs from 'dayjs/esm';

export interface IProduct {
  id: string;
  name?: string | null;
  description?: string | null;
  price?: number | null;
  photo?: string | null;
  photoContentType?: string | null;
  category?: string | null;
  createdDate?: dayjs.Dayjs | null;
  modifiedDate?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
  url?: string | null;
  document?: string | null;
  documentContentType?: string | null;
}

export type NewProduct = Omit<IProduct, 'id'> & { id: null };
