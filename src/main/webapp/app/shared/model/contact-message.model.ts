import { Moment } from 'moment';
import { IContactMessage } from 'app/shared/model/contact-message.model';

export interface IContactMessage {
    id?: string;
    name?: string;
    email?: string;
    title?: string;
    message?: string;
    createdDate?: Moment;
    messages?: IContactMessage[];
}

export class ContactMessage implements IContactMessage {
    constructor(
        public id?: string,
        public name?: string,
        public email?: string,
        public title?: string,
        public message?: string,
        public createdDate?: Moment,
        public messages?: IContactMessage[]
    ) {}
}
