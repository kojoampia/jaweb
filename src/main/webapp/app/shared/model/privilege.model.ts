import * as dayjs from 'dayjs';

export interface IPrivilege {
    id?: string;
    name?: string;
    createdDate?: dayjs.Dayjs;
    createdBy?: string;
}

export class Privilege implements IPrivilege {
    constructor(public id?: string, public name?: string, public createdDate?: dayjs.Dayjs, public createdBy?: string) {}
}
