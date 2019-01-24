import {FuseUtils} from '../../../../@fuse/utils';

export class DegreeConcentration {
    public id: string;
    public concentration: string;

    constructor(degreeConcentration?) {
        degreeConcentration = degreeConcentration || {};
        this.id = degreeConcentration.id || FuseUtils.generateGUID();
        this.concentration = degreeConcentration.concentration || null;
    }
}
