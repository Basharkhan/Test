export class AuthorType {
    public id: string;
    public name: string;

    constructor(authorType?) {
        authorType = authorType || {};
        this.id = authorType.id || null;
        this.name = authorType.name || null;
    }
}
