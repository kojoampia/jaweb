import dayjs from 'dayjs';

export interface IService {
    id?: string;
    name?: string;
    description?: string;
    photoContentType?: string;
    photo?: any;
    createdDate?: dayjs.Dayjs;
    modifiedDate?: dayjs.Dayjs;
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
        public createdDate?: dayjs.Dayjs,
        public modifiedDate?: dayjs.Dayjs,
        public createdBy?: string,
        public modifiedBy?: string,
        public contact?: string
    ) {}
}
