import dayjs from 'dayjs/esm';

export interface ISlide {
    id?: string;
    title?: string;
    description?: string;
    url?: string;
    photoContentType?: string;
    photo?: any;
    createdDate?: dayjs.Dayjs;
    modifiedDate?: dayjs.Dayjs;
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
        public createdDate?: dayjs.Dayjs,
        public modifiedDate?: dayjs.Dayjs,
        public createdBy?: string,
        public modifiedBy?: string
    ) {}
}
