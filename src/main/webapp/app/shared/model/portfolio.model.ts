import { Moment } from 'moment';

export interface IPortfolio {
    id?: string;
    name?: string;
    description?: string;
    url?: string;
    photoContentType?: string;
    photo?: any;
    status?: boolean;
    createdDate?: Moment;
    modifiedDate?: Moment;
    createdBy?: string;
    modifiedBy?: string;
}

export class Portfolio implements IPortfolio {
    constructor(
        public id?: string,
        public name?: string,
        public description?: string,
        public url?: string,
        public photoContentType?: string,
        public photo?: any,
        public status?: boolean,
        public createdDate?: Moment,
        public modifiedDate?: Moment,
        public createdBy?: string,
        public modifiedBy?: string
    ) {
        this.status = this.status || false;
    }
}
