import dayjs from 'dayjs/esm';

export interface IPartner {
    id?: string;
    name?: string;
    link?: string;
    logoContentType?: string;
    logo?: any;
    country?: string;
    location?: string;
    postCode?: string;
    streetAddress?: string;
    email?: string;
    contactPerson?: string;
    logoUrl?: string;
    createdDate?: dayjs.Dayjs;
}

export class Partner implements IPartner {
    constructor(
        public id?: string,
        public name?: string,
        public link?: string,
        public logoContentType?: string,
        public logo?: any,
        public country?: string,
        public location?: string,
        public postCode?: string,
        public streetAddress?: string,
        public email?: string,
        public contactPerson?: string,
        public logoUrl?: string,
        public createdDate?: dayjs.Dayjs
    ) {}
}
