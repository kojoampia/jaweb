import { Moment } from 'moment';
import { ISlide } from 'app/shared/model/slide.model';

export interface ICareer {
    id?: string;
    title?: string;
    content?: string;
    language?: string;
    createdDate?: Moment;
    modifiedDate?: Moment;
    lastModifiedBy?: string;
    slides?: ISlide[];
}

export class Career implements ICareer {
    constructor(
        public id?: string,
        public title?: string,
        public content?: string,
        public language?: string,
        public createdDate?: Moment,
        public modifiedDate?: Moment,
        public lastModifiedBy?: string,
        public slides?: ISlide[]
    ) {}
}
