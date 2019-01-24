import {FuseUtils} from './../../../../@fuse/utils/index';
import {Address} from '../contact-information/address.model';

export class ProfessionalQualification {
    public id: string;
    public certification: string;
    public educationalInstitute: string;
    public address: Address;
    public startDate: Date;
    public endDate: Date;
    public scannedCopyOfCertificate: string;

    constructor(professionalQualification?) {
        professionalQualification = professionalQualification || {};
        this.id = professionalQualification.id || FuseUtils.generateGUID();
        this.certification = professionalQualification.certification || null;
        this.educationalInstitute = professionalQualification.educationalInstitute || null;
        this.address = professionalQualification.address || {};
        this.startDate = professionalQualification.startDate || null;
        this.endDate = professionalQualification.endDate || null;
        this.scannedCopyOfCertificate = professionalQualification.scannedCopyOfCertificate || null;
    }
}
