import { FuseUtils } from './../../../../@fuse/utils/index';
import { Degree } from './degree.enum';
import { DegreeConcentration } from './degree-concentration.model';
import { Employee } from '../../employee-information/employee.model';
import { EducationalInstitute } from './educational-institute.model';
import { DegreeResult } from './degree-result.model';

export class EducationalInformation {
    public id: string;
    public degree: Degree;
    public degreeTitle: string;
    public degreeConcentration: DegreeConcentration;
    public board: string;
    public degreeResult: DegreeResult;
    public educationalInstitute: EducationalInstitute;
    public yearOfPassing: number;
    public duration: number;
    public achievement: string;
    public verified: boolean;
    public verifiedBy: Employee;
    public scannedCopyOfCertificate: string;
    public scannedCopyOfMarkSheet: string;

    constructor(educationalInformation?) {
        educationalInformation = educationalInformation || {};
        this.id = educationalInformation.id || FuseUtils.generateGUID();
        this.degree = educationalInformation.degree || null;
        this.degreeTitle = educationalInformation.degreeTitle || null;
        this.board = educationalInformation.board || null;
        this.degreeConcentration = educationalInformation.degreeConcentration || null;
        this.degreeResult = educationalInformation.degreeResult || {};
        this.educationalInstitute = educationalInformation.educationalInstitute || null;
        this.yearOfPassing = educationalInformation.yearOfPassing || null;
        this.achievement = educationalInformation.achievement || null;
        this.duration = educationalInformation.duration || null;
        this.verified = educationalInformation.verified || null;
        this.verifiedBy = educationalInformation.verifiedBy || null;
        this.scannedCopyOfCertificate = educationalInformation.scannedCopyOfCertificate || null;
        this.scannedCopyOfMarkSheet = educationalInformation.scannedCopyOfMarkSheet || null;

    }
}
