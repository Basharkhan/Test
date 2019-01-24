export class SemesterName {
    public id: number;
    public name: string;

    constructor(semesterName?) {
        semesterName = semesterName || {};
        this.id = semesterName.id || null;
        this.name = semesterName.name || null;
    }
}
