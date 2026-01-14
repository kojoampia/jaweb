import dayjs from 'dayjs/esm';

export interface IContactMessage {
  id: string;
  name?: string | null;
  email?: string | null;
  title?: string | null;
  message?: string | null;
  createdDate?: dayjs.Dayjs | null;
  contact?: IContactMessage | null;
}

export type NewContactMessage = Omit<IContactMessage, 'id'> & { id: null };
