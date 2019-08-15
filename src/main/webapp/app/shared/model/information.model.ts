import { IHome } from 'app/shared/model/home.model';

export interface IInformation {
    id?: string;
    content?: string;
    title?: string;
    brief?: string;
    linkText?: string;
    home?: IHome;
}

export class Information implements IInformation {
    constructor(
        public id?: string,
        public content?: string,
        public title?: string,
        public brief?: string,
        public linkText?: string,
        public home?: IHome
    ) {}
}
