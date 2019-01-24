import {Person} from '../person-information/person.model';

export class User extends Person {
    public username: string;
    public createdAt: Date;
    public updatedAt: Date;
    public accountNonExpired: Boolean;
    public accountNonLocked: Boolean;
    public credentialsNonExpired: Boolean;
    public enabled: Boolean;
    public type: string;

    public tokenIssuedAt: number;
    public tokenExpiredAt: number;

    constructor(user?, person?) {
        super(person);
        user = user || {};
        this.username = user.username || null;
        this.createdAt = user.createdAt || null;
        this.updatedAt = user.updatedAt || null;
        this.accountNonExpired = user.accountNonExpired || false;
        this.accountNonLocked = user.accountNonLocked || false;
        this.credentialsNonExpired = user.credentialsNonExpired || false;
        this.enabled = user.enabled || false;
        this.type = user.type || null;

        this.tokenIssuedAt = user.tokenIssuedAt || null;
        this.tokenExpiredAt = user.tokenExpiredAt || null;
    }

}
