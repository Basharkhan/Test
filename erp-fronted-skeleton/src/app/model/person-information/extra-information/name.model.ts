
export class Name {
    public salutationType?: string;
    public firstName?: string;
    public middleName?: string;
    public lastName?: string;
    public suffix?: string;

    constructor(name?)
    {
        name = name || {};
        this.salutationType = name.salutationType || null;
        this.firstName = name.firstName || null;
        this.middleName = name.middleName || null;
        this.lastName = name.lastName || null;
        this.suffix = name.suffix || null;
    }
}
