import {EmploymentType} from './../employee-information/employment-type.model';
import {FuseUtils} from '@fuse/utils';
import {Designation} from './designation.model';

export class EmployeeDesignation {
    public id: string;
    public designation: Designation;
    public employmentType: EmploymentType;
    public primaryDesignation: boolean;
    public startDate: Date;
    public endDate: Date;

    constructor(employeeDesignation?) {
        employeeDesignation = employeeDesignation || {};
        this.id = employeeDesignation.id || FuseUtils.generateGUID();
        this.designation = employeeDesignation.designation || null;
        this.employmentType = employeeDesignation.employmentType || null;
        this.primaryDesignation = employeeDesignation.primaryDesignation || null;
        this.startDate = employeeDesignation.startDate || null;
        this.endDate = employeeDesignation.endDate || null;
    }
}
