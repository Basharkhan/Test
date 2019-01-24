import {FuseUtils} from '@fuse/utils';

export class EmploymentType {
    public id: string;
    public type: string;
    public details: string;


    constructor(employmentType?) {
        employmentType = employmentType || {};
        this.id = employmentType.id || FuseUtils.generateGUID();
        this.type = employmentType.type || null;
        this.details = employmentType.details || null;
    }
}
