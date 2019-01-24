import {Address} from '../contact-information/address.model';
import {FuseUtils} from '../../../../@fuse/utils';

export class EducationalInstitute {
    public id: string;
    public name: string;
    public address: Address;
    public foreignInstitute: boolean;

    public eiin: string;
    public instituteType: string;
    public managementType: string;
    public studentType: string;
    public contactNumber: string;
    public educationLevel: string;
    public affiliation: string;
    public mpoStatus: string;
    public areaStatus: string;
    public geographicalStatus: string;
    public acronym: string;
    public website: string;

    constructor(educationalInstitute?) {
        educationalInstitute = educationalInstitute || {};
        this.id = educationalInstitute.id || FuseUtils.generateGUID();
        this.name = educationalInstitute.name || null;
        this.address = educationalInstitute.address || null;
        this.foreignInstitute = educationalInstitute.foreignInstitute || null;

        this.eiin = educationalInstitute.eiin || null;
        this.instituteType = educationalInstitute.instituteType || null;
        this.managementType = educationalInstitute.managementType || null;
        this.studentType = educationalInstitute.studentType || null;
        this.contactNumber = educationalInstitute.contactNumber || null;
        this.educationLevel = educationalInstitute.educationLevel || null;
        this.affiliation = educationalInstitute.affiliation || null;
        this.mpoStatus = educationalInstitute.mpoStatus || null;
        this.areaStatus = educationalInstitute.areaStatus || null;
        this.geographicalStatus = educationalInstitute.geographicalStatus || null;
        this.acronym = educationalInstitute.acronym || null;
        this.website = educationalInstitute.website || null;
    }
}
