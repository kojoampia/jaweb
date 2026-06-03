import dayjs from 'dayjs';

export interface ICareer {
    id?: string;
    name?: string;
    description?: string;
    department?: string;
    createdDate?: dayjs.Dayjs;
    modifiedDate?: dayjs.Dayjs;
    lastModifiedBy?: string;
}

export class Career implements ICareer {
    constructor(
        public id?: string,
        public name?: string,
        public description?: string,
        public department?: string,
        public createdDate?: dayjs.Dayjs,
        public modifiedDate?: dayjs.Dayjs,
        public lastModifiedBy?: string
    ) {}
}
