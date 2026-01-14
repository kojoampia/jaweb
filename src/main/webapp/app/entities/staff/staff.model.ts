import dayjs from 'dayjs/esm';
import { IUser } from 'app/entities/user/user.model';
import { DocumentType } from 'app/entities/enumerations/document-type.model';

export interface IStaff {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  dateOfBirth?: dayjs.Dayjs | null;
  email?: string | null;
  digitalAddress?: string | null;
  streetAddress?: string | null;
  postalAddress?: string | null;
  town?: string | null;
  district?: string | null;
  city?: string | null;
  region?: string | null;
  country?: string | null;
  digitalProfile?: string | null;
  digitalProfileContentType?: string | null;
  accountNumber?: string | null;
  accountType?: string | null;
  documents?: string | null;
  documentsContentType?: string | null;
  createdDate?: dayjs.Dayjs | null;
  modifiedDate?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
  documentType?: keyof typeof DocumentType | null;
  credential?: Pick<IUser, 'id' | 'login'> | null;
}

export type NewStaff = Omit<IStaff, 'id'> & { id: null };
