import {EmploymentInformation} from './employment-information.model';
import {Nominee} from './nominee.model';
import {User} from '../auth/user.model';
import {Defaulter} from '../other/defaulter.model';

export class Employee extends User {
    public id: string;
    public cardNumber: string;
    public employmentInformation: EmploymentInformation;
    public nomineeList: Nominee[];
    public defaulterList: Defaulter[];

    constructor(employee?, person?) {
        super(person);
        employee = employee || {};
        this.id = employee.id || Math.floor(100000 + Math.random() * 900000);
        this.cardNumber = employee.cardNumber || '';
        this.employmentInformation = employee.employmentInformation || null;
        this.nomineeList = employee.nomineeList || null;
        this.defaulterList = employee.defaulterList || null;
    }
}
