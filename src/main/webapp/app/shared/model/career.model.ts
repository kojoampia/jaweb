import { Moment } from 'moment';

export interface ICareer {
    id?: string;
    name?: string;
    description?: string;
    department?: string;
    createdDate?: Moment;
    modifiedDate?: Moment;
    lastModifiedBy?: string;
}

export class Career implements ICareer {
    constructor(
        public id?: string,
        public name?: string,
        public description?: string,
        public department?: string,
        public createdDate?: Moment,
        public modifiedDate?: Moment,
        public lastModifiedBy?: string
    ) {}
}
