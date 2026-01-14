import dayjs from 'dayjs/esm';

export interface IPartner {
  id: string;
  name?: string | null;
  link?: string | null;
  logo?: string | null;
  logoContentType?: string | null;
  country?: string | null;
  location?: string | null;
  postCode?: string | null;
  streetAddress?: string | null;
  email?: string | null;
  contactPerson?: string | null;
  logoUrl?: string | null;
  createdDate?: dayjs.Dayjs | null;
}

export type NewPartner = Omit<IPartner, 'id'> & { id: null };
