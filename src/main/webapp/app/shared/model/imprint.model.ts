import { Moment } from 'moment';
import { ISlide } from './slide.model';

export interface IImprint {
    id?: string;
    title?: string;
    content?: string;
    slides?: ISlide[];
    createdDate?: Moment;
    modifiedDate?: Moment;
    lastModifiedBy?: string;
}

export class Imprint implements IImprint {
    constructor(
        public id?: string,
        public title?: string,
        public content?: string,
        public slides?: ISlide[],
        public createdDate?: Moment,
        public modifiedDate?: Moment,
        public lastModifiedBy?: string
    ) {}
}
