import {Address} from './address.model';
import {Email} from './email.model';
import {Phone} from './phone.model';
import {Name} from './../extra-information/name.model';

export class EmergencyContactPerson {
    public name: Name;
    public addressList: Address[];
    public phoneList: Phone[];
    public emailList: Email[];
    public relationship: string;

    constructor(emergencyContactPerson?) {
        emergencyContactPerson = emergencyContactPerson || {};
        this.name = emergencyContactPerson.name || {};
        this.addressList = emergencyContactPerson.addressList || null;
        this.phoneList = emergencyContactPerson.phoneList || null;
        this.emailList = emergencyContactPerson.emailList || null;
        this.relationship = emergencyContactPerson.relationship || null;
    }
}
