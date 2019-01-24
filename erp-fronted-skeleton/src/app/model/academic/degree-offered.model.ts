import {FuseUtils} from '../../../@fuse/utils';

export class DegreeOffered {
    public id: string;
    public title: string;

    constructor(degreeOffered?) {
        degreeOffered = degreeOffered || {};
        this.id = degreeOffered.id || FuseUtils.generateGUID();
        this.title = degreeOffered.title || null;
    }

}
