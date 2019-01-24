export class PublicationType {
    public id: string;
    public name: string;
    public details: string;

    constructor(publicationType?) {
        publicationType = publicationType || {};
        this.id = publicationType.id || null;
        this.name = publicationType.name || null;
        this.details = publicationType.details || null;
    }
}
