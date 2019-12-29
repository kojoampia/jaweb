import { Moment } from 'moment';
import { ISlide } from 'app/shared/model/slide.model';

export interface IBlog {
    id?: string;
    title?: string;
    content?: string;
    createdDate?: Moment;
    modifiedDate?: Moment;
    lastModifiedBy?: string;
    slides?: ISlide[];
}

export class Blog implements IBlog {
    constructor(
        public id?: string,
        public title?: string,
        public content?: string,
        public createdDate?: Moment,
        public modifiedDate?: Moment,
        public lastModifiedBy?: string,
        public slides?: ISlide[]
    ) {}
}
