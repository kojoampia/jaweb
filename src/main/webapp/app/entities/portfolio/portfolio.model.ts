import dayjs from 'dayjs/esm';

export interface IPortfolio {
  id: string;
  name?: string | null;
  description?: string | null;
  url?: string | null;
  photo?: string | null;
  photoContentType?: string | null;
  status?: boolean | null;
  createdDate?: dayjs.Dayjs | null;
  modifiedDate?: dayjs.Dayjs | null;
  createdBy?: string | null;
  modifiedBy?: string | null;
}

export type NewPortfolio = Omit<IPortfolio, 'id'> & { id: null };
