import {FuseUtils} from '@fuse/utils';
import {Person} from './../person-information/person.model';

export class Nominee extends Person {
    public nomineeId: string;
    public relationship: string;
    public percentage: number;

    constructor(nominee?, person?) {
        super(person);
        nominee = nominee || {};
        this.nomineeId = nominee.nomineeId || FuseUtils.generateGUID();
        this.relationship = nominee.relationship || null;
        this.percentage = nominee.percentage || null;
    }
}
