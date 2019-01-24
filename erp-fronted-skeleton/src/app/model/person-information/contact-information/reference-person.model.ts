import {Person} from '../person.model';

export class ReferencePerson extends Person {

    public type: string;

    constructor(referencePerson?, person?) {
        super(person);
        referencePerson = referencePerson || {};
        this.type = referencePerson.type || null;
    }
}
