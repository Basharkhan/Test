import {FuseUtils} from '@fuse/utils';
import {DesignationType} from './designation-type.enum';
import {Office} from './office.model';
import {Rank} from './rank.model';

export class Designation {
    public id: string;
    public rank: Rank;
    public office: Office;
    public designationType: DesignationType;
    public superiorDesignationList: Designation[];
    public subordinatesList: Designation[];
    public allowedOperationList: any[];

    constructor(designation?) {
        designation = designation || {};
        this.id = designation.id || FuseUtils.generateGUID();
        this.rank = designation.rank || null;
        this.office = designation.office || {};
        this.designationType = designation.designationType || null;
        this.superiorDesignationList = designation.superiorDesignationList || null;
        this.subordinatesList = designation.subordinatesList || null;
        this.allowedOperationList = designation.allowedOperationList || null;
    }
}
