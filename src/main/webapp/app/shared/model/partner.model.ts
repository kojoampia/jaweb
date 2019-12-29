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
        public contactPerson?: string
    ) {}
}
