import * as dayjs from 'dayjs';
import { ISlide } from 'app/shared/model/slide.model';

export interface IContact {
    id?: string;
    title?: string;
    address?: string;
    street?: string;
    code?: string;
    city?: string;
    state?: string;
    region?: string;
    country?: string;
    telephone?: string;
    email?: string;
    whatsapp?: string;
    facebook?: string;
    twitter?: string;
    google?: string;
    youtube?: string;
    lastModified?: dayjs.Dayjs;
    lastModifiedBy?: string;
    language?: string;
    appointment?: string;
    latitude?: number;
    longitude?: number;
    imageContentType?: string;
    image?: any;
    url?: string;
    slides?: ISlide[];
}

export class Contact implements IContact {
    constructor(
        public id?: string,
        public title?: string,
        public address?: string,
        public street?: string,
        public code?: string,
        public city?: string,
        public state?: string,
        public region?: string,
        public country?: string,
        public telephone?: string,
        public email?: string,
        public whatsapp?: string,
        public facebook?: string,
        public twitter?: string,
        public google?: string,
        public youtube?: string,
        public lastModified?: dayjs.Dayjs,
        public lastModifiedBy?: string,
        public language?: string,
        public appointment?: string,
        public latitude?: number,
        public longitude?: number,
        public imageContentType?: string,
        public image?: any,
        public url?: string,
        public slides?: ISlide[]
    ) {}
}
