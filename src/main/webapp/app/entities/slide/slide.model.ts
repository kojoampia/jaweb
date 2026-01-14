import dayjs from 'dayjs/esm';
import { IAbout } from 'app/entities/about/about.model';
import { IBlog } from 'app/entities/blog/blog.model';

export interface ISlide {
  id: string;
  title?: string | null;
  description?: string | null;
  url?: string | null;
  photo?: string | null;
  photoContentType?: string | null;
  createdDate?: dayjs.Dayjs | null;
  modifiedDate?: dayjs.Dayjs | null;
  createdBy?: string | null;
  modifiedBy?: string | null;
  about?: IAbout | null;
  blog?: IBlog | null;
}

export type NewSlide = Omit<ISlide, 'id'> & { id: null };
