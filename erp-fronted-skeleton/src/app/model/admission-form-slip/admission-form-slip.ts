import { Name } from "../person-information/extra-information/name.model";
import { AcademicProgram } from "../academic/academic-program.model";
import { Phone } from "../person-information/contact-information/phone.model";
import { EducationalInformation } from "../person-information/educational-information/educational-information.model";
import { Person } from "../person-information/person.model";

export class AdmissionFormSlip {
    public name: Name;
    public program: AcademicProgram;
    public phoneNumber: Phone;
    public educationalInformationList: EducationalInformation[];
    public reference: string;
    public referencePerson: Person;
}
