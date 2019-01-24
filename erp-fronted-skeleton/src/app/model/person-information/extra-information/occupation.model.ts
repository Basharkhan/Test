import {FuseUtils} from './../../../../@fuse/utils/index';

export class Occupation {
    public id: string;
    public title: string;

    constructor(occupation?) {
        occupation = occupation || {};
        this.id = occupation.id || FuseUtils.generateGUID();
        this.title = occupation.title || null;
    }
}
