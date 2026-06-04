import dayjs from 'dayjs/esm';
export interface IContactMessage {
    id?: string;
    name?: string;
    email?: string;
    title?: string;
    message?: string;
    createdDate?: dayjs.Dayjs;
    approved?: boolean;
    replies?: IContactMessage[];
}

export class ContactMessage implements IContactMessage {
    constructor(
        public id?: string,
        public name?: string,
        public email?: string,
        public title?: string,
        public message?: string,
        public createdDate?: dayjs.Dayjs,
        public approved?: boolean,
        public replies?: IContactMessage[]
    ) {}
}
