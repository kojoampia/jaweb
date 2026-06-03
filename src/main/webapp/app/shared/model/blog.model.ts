import dayjs from 'dayjs';
import { ISlide } from 'app/shared/model/slide.model';

export interface IBlog {
    id?: string;
    title?: string;
    content?: string;
    createdDate?: dayjs.Dayjs;
    modifiedDate?: dayjs.Dayjs;
    lastModifiedBy?: string;
    slides?: ISlide[];
}

export class Blog implements IBlog {
    constructor(
        public id?: string,
        public title?: string,
        public content?: string,
        public createdDate?: dayjs.Dayjs,
        public modifiedDate?: dayjs.Dayjs,
        public lastModifiedBy?: string,
        public slides?: ISlide[]
    ) {}
}
