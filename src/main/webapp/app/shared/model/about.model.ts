import * as dayjs from 'dayjs';
import { ISlide } from 'app/shared/model/slide.model';

export interface IAbout {
    id?: string;
    title?: string;
    content?: string;
    language?: string;
    createdDate?: dayjs.Dayjs;
    modifiedDate?: dayjs.Dayjs;
    lastModifiedBy?: string;
    slides?: ISlide[];
}

export class About implements IAbout {
    constructor(
        public id?: string,
        public title?: string,
        public content?: string,
        public language?: string,
        public createdDate?: dayjs.Dayjs,
        public modifiedDate?: dayjs.Dayjs,
        public lastModifiedBy?: string,
        public slides?: ISlide[]
    ) {}
}
