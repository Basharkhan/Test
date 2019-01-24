import { Person } from './../person.model';
import { AuthorType } from './author-type.enum';

export class Author extends Person {
    public authorType: AuthorType;
    public designation: string;
    public institute: string;

    constructor(author?, person?)
    {
        super(person);
        author = author || {};
        this.authorType = author.authorType || null;
        this.designation = author.designation || null;
        this.institute = author.institute || null;
    }
}
