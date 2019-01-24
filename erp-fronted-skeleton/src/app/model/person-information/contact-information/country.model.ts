import {FuseUtils} from '../../../../@fuse/utils';

export class Country {
    public id: string;
    public code: string;
    public name: string;

    constructor(country?) {
        country = country || {};
        this.id = country.id || FuseUtils.generateGUID();
        this.code = country.code || null;
        this.name = country.name || null;
    }
}
