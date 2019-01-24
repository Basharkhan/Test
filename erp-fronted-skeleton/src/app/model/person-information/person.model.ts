import {Name} from './extra-information/name.model';
import {Email} from './contact-information/email.model';
import {Occupation} from './extra-information/occupation.model';
import {Phone} from './contact-information/phone.model';
import {Religion} from './extra-information/religion.model';
import {Address} from './contact-information/address.model';
import {EmergencyContactPerson} from './contact-information/emergency-contact-person.model';
import {Training} from './educational-information/training.model';
import {WorkExperience} from './employment-information/work-experience.model';
import {ProfessionalQualification} from './educational-information/professional-qualification.model';
import {LanguageProficiency} from './extra-information/language-proficiency.model';
import {Specialization} from './extra-information/specialization.model';
import {ProfileLink} from './extra-information/profile-link.model';
import {Publication} from './publication-information/publication.model';
import {EducationalInformation} from './educational-information/educational-information.model';
import {StandardizedTestResult} from './educational-information/standardized-test-result.model';
import {ReferencePerson} from './contact-information/reference-person.model';

export class Person {
    public name: Name;
    public father: Person;
    public mother: Person;
    public guardian: Person;
    public occupation: Occupation;
    public addressList: Address[];
    public phoneList: Phone[];
    public emailList: Email[];
    public gender: string;
    public religion: Religion;
    public nationality: string;
    public bloodGroup: any;
    public dateOfBirth: Date;
    // public placeOfBirth: Address;
    public nationalIdNumber: string;
    public birthCertificateNumber: string;
    public passportNumber: string;
    public tinNumber: string;
    public maritalStatus: any;
    public spouseList: Person[];
    public childList: Person[];

    public emergencyContactPerson: EmergencyContactPerson;
    public profileLink: ProfileLink;
    public educationalInformationList: EducationalInformation[];
    public publicationList: Publication[];
    public specialization: Specialization;
    public languageProficiencyList: LanguageProficiency[];
    public trainingList: Training[];
    public professionalQualificationList: ProfessionalQualification[];
    public workExperienceList: WorkExperience[];
    public referenceList: ReferencePerson[];
    public standardizedTestResultList: StandardizedTestResult[];

    public designationString: string;
    public monthlyIncome: number;

    public picture: string;
    public scannedCopyOfNid: string;
    public scannedCopyOfBirthCertificate: string;
    public scannedCopyOfTinCertificate: string;
    public scannedCopyOfPassport: string;

    public howDidYouKnow: string;

    constructor(person?) {
        person = person || {};
        this.name = person.name || {};
        this.father = person.father || null;
        this.mother = person.mother || null;
        this.guardian = person.guardian || null;
        this.occupation = person.occupation || null;
        this.addressList = person.addressList || null;
        this.spouseList = person.spouseList || null;
        this.childList = person.childList || null;
        this.emailList = person.emailList || null;
        this.phoneList = person.phoneList || null;
        this.trainingList = person.trainingList || null;
        this.referenceList = person.referenceList || null;
        this.specialization = person.specialization || null;
        this.educationalInformationList = person.educationalInformationList || null;
        this.languageProficiencyList = person.languageProficiencyList || null;
        this.professionalQualificationList = person.professionalQualificationList || null;
        this.workExperienceList = person.workExperienceList || null;
        this.emergencyContactPerson = person.emergencyContactPerson || null;
        this.standardizedTestResultList = person.standardizedTestResultList || null;
        this.publicationList = person.publicationList || null;
        this.gender = person.gender || null;
        this.religion = person.religion || null;
        this.bloodGroup = person.bloodGroup || null;
        this.maritalStatus = person.maritalStatus || null;
        this.dateOfBirth = person.dateOfBirth || null;
        this.nationality = person.nationality || null;
        this.nationalIdNumber = person.nationalIdNumber || null;
        this.birthCertificateNumber = person.birthCertificateNumber || null;
        this.passportNumber = person.passportNumber || null;
        this.tinNumber = person.tinNumber || null;
        this.profileLink = person.profileLink || null;
        this.picture = person.picture || null;
        this.scannedCopyOfNid = person.scannedCopyOfNid || null;
        this.scannedCopyOfBirthCertificate = person.scannedCopyOfBirthCertificate || null;
        this.scannedCopyOfTinCertificate = person.scannedCopyOfTinCertificate || null;
        this.scannedCopyOfPassport = person.scannedCopyOfPassport || null;
        this.designationString = person.designationString || null;
        this.monthlyIncome = person.monthlyIncome || null;
        this.howDidYouKnow = person.howDidYouKnow || null;
    }
}
