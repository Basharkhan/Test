export class DefaulterType {
    public id: string;
    public type: string;
    public details: string;

    constructor(defaulterType?) {
        defaulterType = defaulterType || {};
        this.id = defaulterType.id || null;
        this.type = defaulterType.type || null;
        this.details = defaulterType.details || null;
    }
}
