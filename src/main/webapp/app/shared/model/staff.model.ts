import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export const enum DocumentType {
    NATIONAL_ID = 'NATIONAL_ID',
    PASSPORT = 'PASSPORT',
    DRIVING_LICENSE = 'DRIVING_LICENSE',
    VOTER_ID = 'VOTER_ID'
}

export interface IStaff {
    id?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Moment;
    email?: string;
    digitalAddress?: string;
    streetAddress?: string;
    postalAddress?: string;
    town?: string;
    district?: string;
    city?: string;
    region?: string;
    country?: string;
    digitalProfileContentType?: string;
    digitalProfile?: any;
    accountNumber?: string;
    accountType?: string;
    documentsContentType?: string;
    documents?: any;
    createdDate?: Moment;
    modifiedDate?: Moment;
    lastModifiedBy?: string;
    documentType?: DocumentType;
    credential?: IUser;
}

export class Staff implements IStaff {
    constructor(
        public id?: string,
        public firstName?: string,
        public lastName?: string,
        public dateOfBirth?: Moment,
        public email?: string,
        public digitalAddress?: string,
        public streetAddress?: string,
        public postalAddress?: string,
        public town?: string,
        public district?: string,
        public city?: string,
        public region?: string,
        public country?: string,
        public digitalProfileContentType?: string,
        public digitalProfile?: any,
        public accountNumber?: string,
        public accountType?: string,
        public documentsContentType?: string,
        public documents?: any,
        public createdDate?: Moment,
        public modifiedDate?: Moment,
        public lastModifiedBy?: string,
        public documentType?: DocumentType,
        public credential?: IUser
    ) {}
}
