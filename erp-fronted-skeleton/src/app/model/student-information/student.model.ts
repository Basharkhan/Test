import {User} from '../auth/user.model';
import {AcademicProgram} from '../academic/academic-program.model';
import {Semester} from '../academic/semester.model';
import {CostBearer} from './cost-bearer.model';
import {Defaulter} from '../other/defaulter.model';

export class Student extends User {
    public id: string;
    public cardNumber: string;
    public academicProgram: AcademicProgram;
    public batchId: number;
    public enrollingSemester: Semester;
    public costBearer: CostBearer;
    public createdBy: User;
    public createdTime: Date;
    public lastUpdatedBy: User;
    public lastUpdatedAt: Date;
    public defaulterList: Defaulter[];

    constructor(student?, person?) {
        super(person);
        student = student || {};
        this.id = student.id || null;
        this.cardNumber = student.cardNumber || null;
        this.academicProgram = student.cardNumber || null;
        this.batchId = student.batchId || null;
        this.enrollingSemester = student.enrollingSemester || null;
        this.costBearer = student.costBearer || null;
        this.createdBy = student.createdBy || null;
        this.createdTime = student.createdTime || null;
        this.lastUpdatedBy = student.lastUpdatedBy || null;
        this.lastUpdatedAt = student.lastUpdatedAt || null;
        this.defaulterList = student.defaulterList || null;
    }
}
