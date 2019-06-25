import { Moment } from 'moment';
import { ISlide } from 'app/shared/model/slide.model';
import { IPortfolio } from 'app/shared/model/portfolio.model';
import { IService } from 'app/shared/model/service.model';
import { IBlog } from 'app/shared/model/blog.model';

export interface IHome {
    id?: string;
    header?: string;
    createdDate?: Moment;
    modifiedDate?: Moment;
    createdBy?: string;
    modifiedBy?: string;
    current?: boolean;
    version?: number;
    information?: string;
    slides?: ISlide[];
    portfolios?: IPortfolio[];
    services?: IService[];
    blogs?: IBlog[];
}

export class Home implements IHome {
    constructor(
        public id?: string,
        public header?: string,
        public information?: string,
        public current?: boolean,
        public version?: number,
        public slides?: ISlide[],
        public portfolios?: IPortfolio[],
        public services?: IService[],
        public blogs?: IBlog[],
        public createdDate?: Moment,
        public modifiedDate?: Moment,
        public createdBy?: string,
        public modifiedBy?: string
    ) {
        this.current = this.current || false;
    }
}
