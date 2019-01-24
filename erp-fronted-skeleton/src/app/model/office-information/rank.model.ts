import {FuseUtils} from '@fuse/utils';

export class Rank {
    public id: string;
    public name: string;

    constructor(rank?) {
        rank = rank || {};
        this.id = rank.id || FuseUtils.generateGUID();
        this.name = rank.name || null;
    }
}
