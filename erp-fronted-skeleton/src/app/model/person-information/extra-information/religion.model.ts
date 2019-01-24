import {FuseUtils} from '@fuse/utils';

export class Religion {
    public id: string;
    public name: string;

    constructor(religion?) {
        religion = religion || {};
        this.id = religion.id || FuseUtils.generateGUID();
        this.name = religion.name || null;
    }
}
