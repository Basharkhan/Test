import {FuseUtils} from '../../../@fuse/utils';
import {DegreeOffered} from './degree-offered.model';
import {Office} from '../office-information/office.model';
import {Moment} from 'moment';
import {SemesterName} from './semester-name.enum';
import {Semester} from './semester.model';

export class AcademicProgram {
    public id: string;
    public academicProgramId: number;
    public idForGeneratingStudentId: string;
    public name: string;
    public gsuiteGroupName: string;
    public degreeOffered: DegreeOffered;
    public enrollingSemesterList: SemesterName[];
    public description: string;
    public offeredBy: Office;
    public mission: string;
    public vision: string;
    public establishmentDate: Moment;
    public logo: string;
    public inactive: Boolean;
    public currentEnrollingBatchNumber: number;
    public currentEnrollingSemester: Semester;

    constructor(academicProgram?) {
        academicProgram = academicProgram || {};
        this.id = academicProgram.id || FuseUtils.generateGUID();
        this.academicProgramId = academicProgram.academicProgramId || null;
        this.idForGeneratingStudentId = academicProgram.idForGeneratingStudentId || null;
        this.name = academicProgram.name || null;
        this.gsuiteGroupName = academicProgram.gsuiteGroupName || null;
        this.degreeOffered = academicProgram.degreeOffered || null;
        this.enrollingSemesterList = academicProgram.enrollingSemesterList || null;
        this.description = academicProgram.description || null;
        this.offeredBy = academicProgram.offeredBy || null;
        this.mission = academicProgram.mission || null;
        this.vision = academicProgram.vision || null;
        this.establishmentDate = academicProgram.establishmentDate || null;
        this.logo = academicProgram.logo || null;
        this.inactive = academicProgram.inactive || null;
        this.currentEnrollingBatchNumber = academicProgram.currentEnrollingBatchNumber || null;
        this.currentEnrollingSemester = academicProgram.currentEnrollingSemester || null;
    }

}
