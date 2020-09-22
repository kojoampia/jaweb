import { IPrivilege } from 'app/shared/model/privilege.model';

export interface IAuthority {
    id?: string;
    name?: string;
    privileges?: IPrivilege[];
}

export class Authority implements IAuthority {
    constructor(public id?: string, public name?: string, public privileges?: IPrivilege[]) {}
}
