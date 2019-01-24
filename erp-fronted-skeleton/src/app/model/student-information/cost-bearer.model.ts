import {Person} from '../person-information/person.model';

export class CostBearer extends Person {
    public relationship: string;

    constructor(costBearer?, person?) {
        super(person);
        costBearer = costBearer || {};
        this.relationship = costBearer.relationship || null;
    }
}
