import {SemesterName} from './semester-name.enum';

export class Semester {
    public id: number;
    public name: SemesterName;
    public year: number;

    constructor(semester?) {
        semester = semester || {};
        this.id = semester.id || null;
        this.name = semester.name || null;
        this.year = semester.year || null;
    }
}
