import {FuseUtils} from '@fuse/utils';
import {Address} from '../contact-information/address.model';
import {Person} from '../person.model';

export class WorkExperience {
    public id: string;
    public companyName: string;
    public companyType: string;
    public companyLocation: Address;
    public referencePerson: Person;
    public designation: string;
    public jobResponsibility: string;
    public achievement: string;
    public department: string;
    public startDate: Date;
    public endDate: Date;
    public scannedCopyOfCertificate: string;

    constructor(workExperience?) {
        workExperience = workExperience || {};
        this.id = workExperience.id || FuseUtils.generateGUID();
        this.companyName = workExperience.companyName || null;
        this.companyType = workExperience.companyType || null;
        this.companyLocation = workExperience.companyLocation || null;
        this.referencePerson = workExperience.referencePerson || null;
        this.designation = workExperience.designation || null;
        this.jobResponsibility = workExperience.jobResponsibility || null;
        this.achievement = workExperience.achievement || null;
        this.department = workExperience.department || null;
        this.startDate = workExperience.startDate || null;
        this.endDate = workExperience.endDate || null;
        this.scannedCopyOfCertificate = workExperience.scannedCopyOfCertificate || null;
    }
}
