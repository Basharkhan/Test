import { DegreeResultType } from './degree-resul-type.enum';
import { BoardLetterGrade } from './board-letter-grade.model';

export class DegreeResult {
    
    public degreeResultType: DegreeResultType;
    public degreeDivisionType: string;
    public marksPercentage: number;
    public letterGrade: BoardLetterGrade;
    public rollNumber: string;
    public registrationNumber: string;
    public cgpa: number;
    public cgpaWithoutFourthSubject: number;
    public scale: number;

    constructor(degreeResult?) {
        degreeResult = degreeResult || {};
        this.degreeResultType = degreeResult.degreeResultType || {};
        this.degreeDivisionType = degreeResult.degreeDivisionType || null;
        this.marksPercentage = degreeResult.marksPercentage || null;
        this.letterGrade = degreeResult.letterGrade || null;
        this.rollNumber = degreeResult.rollNumber || null;
        this.cgpa = degreeResult.cgpa || null;
        this.cgpaWithoutFourthSubject = degreeResult.cgpaWithoutFourthSubject || null;
        this.scale = degreeResult.scale || null;
    }
}
