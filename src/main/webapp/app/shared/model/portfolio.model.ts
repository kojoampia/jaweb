import dayjs from 'dayjs/esm';

export interface IPortfolio {
    id?: string;
    name?: string;
    description?: string;
    url?: string;
    photoContentType?: string;
    photo?: any;
    status?: boolean;
    createdDate?: dayjs.Dayjs;
    modifiedDate?: dayjs.Dayjs;
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
        public createdDate?: dayjs.Dayjs,
        public modifiedDate?: dayjs.Dayjs,
        public createdBy?: string,
        public modifiedBy?: string
    ) {
        this.status = this.status || false;
    }
}
