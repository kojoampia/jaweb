import dayjs from 'dayjs/esm';

export interface IContact {
  id: string;
  title?: string | null;
  address?: string | null;
  street?: string | null;
  code?: string | null;
  city?: string | null;
  state?: string | null;
  region?: string | null;
  country?: string | null;
  telephone?: string | null;
  email?: string | null;
  whatsapp?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  google?: string | null;
  youtube?: string | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
  language?: string | null;
  appointment?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  image?: string | null;
  imageContentType?: string | null;
  url?: string | null;
}

export type NewContact = Omit<IContact, 'id'> & { id: null };
