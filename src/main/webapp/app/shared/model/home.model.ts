import dayjs from 'dayjs';
import { ISlide } from 'app/shared/model/slide.model';
import { IPortfolio } from 'app/shared/model/portfolio.model';
import { IService } from 'app/shared/model/service.model';
import { IBlog } from 'app/shared/model/blog.model';
import { IInformation } from 'app/shared/model/information.model';
import { IPartner } from './partner.model';

export interface IHome {
    id?: string;
    header?: string;
    createdDate?: dayjs.Dayjs;
    modifiedDate?: dayjs.Dayjs;
    createdBy?: string;
    modifiedBy?: string;
    current?: boolean;
    version?: number;
    slides?: ISlide[];
    portfolios?: IPortfolio[];
    services?: IService[];
    blogs?: IBlog[];
    partners?: IPartner[];
    information?: IInformation;
}

export class Home implements IHome {
    constructor(
        public id?: string,
        public header?: string,
        public createdDate?: dayjs.Dayjs,
        public modifiedDate?: dayjs.Dayjs,
        public createdBy?: string,
        public modifiedBy?: string,
        public current?: boolean,
        public version?: number,
        public slides?: ISlide[],
        public portfolios?: IPortfolio[],
        public services?: IService[],
        public blogs?: IBlog[],
        public information?: IInformation,
        public partners?: IPartner[]
    ) {
        this.current = this.current || false;
    }
}
