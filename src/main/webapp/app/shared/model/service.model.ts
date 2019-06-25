import { Moment } from 'moment';

export interface IService {
    id?: string;
    name?: string;
    description?: string;
    photoContentType?: string;
    photo?: any;
    createdDate?: Moment;
    modifiedDate?: Moment;
    createdBy?: string;
    modifiedBy?: string;
    contact?: string;
}

export class Service implements IService {
    constructor(
        public id?: string,
        public name?: string,
        public description?: string,
        public photoContentType?: string,
        public photo?: any,
        public createdDate?: Moment,
        public modifiedDate?: Moment,
        public createdBy?: string,
        public modifiedBy?: string,
        public contact?: string
    ) {}
}
