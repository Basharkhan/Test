export class GSuiteUser {
    public id: string;
    public email: string;
    public initialPassword: string;
    public acceptedToC: Boolean;
    public tocAcceptedTime: Date;

    constructor(gSuiteUser?) {
        gSuiteUser = gSuiteUser || {};
        this.id = gSuiteUser.id || null;
        this.email = gSuiteUser.email || null;
        this.initialPassword = gSuiteUser.initialPassword || null;
        this.acceptedToC = gSuiteUser.acceptedToC || null;
        this.tocAcceptedTime = gSuiteUser.tocAcceptedTime || false;
    }
}
