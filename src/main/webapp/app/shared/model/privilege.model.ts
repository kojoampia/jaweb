import { Moment } from 'moment';

export interface IPrivilege {
    id?: string;
    name?: string;
    createdDate?: Moment;
    createdBy?: string;
}

export class Privilege implements IPrivilege {
    constructor(public id?: string, public name?: string, public createdDate?: Moment, public createdBy?: string) {}
}
