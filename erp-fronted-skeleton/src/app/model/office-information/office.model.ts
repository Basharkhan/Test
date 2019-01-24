import {FuseUtils} from '@fuse/utils';
import {Employee} from '../employee-information/employee.model';
import {Phone} from '../person-information/contact-information/phone.model';
import {Email} from '../person-information/contact-information/email.model';
import {Address} from '../person-information/contact-information/address.model';
import {OfficeType} from './office-type.enum';

export class Office {
    public id: string;
    public officeId: number;
    public ussId: number;
    public officeType: OfficeType;
    public name: string;
    public gsuiteGroupName: string;
    public description: string;
    public superiorOffice: Office;
    public subOfficeList: Office[];
    public headOfOffice: Employee;
    public contactEmployee: Employee;
    public phoneList: Phone[];
    public emailList: Email[];
    public employeeList: Employee[];
    public establishmentDate: Date;
    public address: Address;
    public mission: string;
    public vision: string;
    public logo: string;
    public inactive: Boolean;

    constructor(office?) {
        office = office || {};
        this.id = office.id || FuseUtils.generateGUID();
        this.officeId = office.officeId || null;
        this.ussId = office.ussId || null;
        this.officeType = office.officeType || null;
        this.name = office.name || null;
        this.gsuiteGroupName = office.gsuiteGroupName || null;
        this.description = office.description || null;
        this.superiorOffice = office.superiorOffice || null;
        this.subOfficeList = office.subOfficeList || null;
        this.headOfOffice = office.headOfOffice || null;
        this.contactEmployee = office.contactEmployee || null;
        this.phoneList = office.phoneList || null;
        this.emailList = office.emailList || null;
        this.employeeList = office.employeeList || null;
        this.establishmentDate = office.establishmentDate || null;
        this.address = office.address || null;
        this.mission = office.mission || null;
        this.vision = office.vision || null;
        this.logo = office.logo || null;
        this.inactive = office.inactive || null;
    }

}
