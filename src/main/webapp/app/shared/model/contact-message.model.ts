import { Moment } from 'moment';
export interface IContactMessage {
    id?: string;
    name?: string;
    email?: string;
    title?: string;
    message?: string;
    createdDate?: Moment;
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
        public createdDate?: Moment,
        public approved?: boolean,
        public replies?: IContactMessage[]
    ) {}
}
