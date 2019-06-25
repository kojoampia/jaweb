import { Moment } from 'moment';

export interface ISlide {
    id?: string;
    title?: string;
    description?: string;
    url?: string;
    photoContentType?: string;
    photo?: any;
    createdDate?: Moment;
    modifiedDate?: Moment;
    createdBy?: string;
    modifiedBy?: string;
}

export class Slide implements ISlide {
    constructor(
        public id?: string,
        public title?: string,
        public description?: string,
        public url?: string,
        public photoContentType?: string,
        public photo?: any,
        public createdDate?: Moment,
        public modifiedDate?: Moment,
        public createdBy?: string,
        public modifiedBy?: string
    ) {}
}
