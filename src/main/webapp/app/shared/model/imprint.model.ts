import dayjs from 'dayjs/esm';
import { ISlide } from './slide.model';

export interface IImprint {
    id?: string;
    title?: string;
    content?: string;
    slides?: ISlide[];
    createdDate?: dayjs.Dayjs;
    modifiedDate?: dayjs.Dayjs;
    lastModifiedBy?: string;
}

export class Imprint implements IImprint {
    constructor(
        public id?: string,
        public title?: string,
        public content?: string,
        public slides?: ISlide[],
        public createdDate?: dayjs.Dayjs,
        public modifiedDate?: dayjs.Dayjs,
        public lastModifiedBy?: string
    ) {}
}
