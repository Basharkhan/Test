import {FuseUtils} from './../../../../@fuse/utils/index';
import {Skill} from './skill.model';

export class Specialization {
    public id: string;
    public skillList: Skill[];
    public skillDescription: string;
    public extraCurriculumActivities: string;

    constructor(specialization?) {
        specialization = specialization || {};
        this.id = specialization.id || FuseUtils.generateGUID();
        this.skillList = specialization.skillList || null;
        this.skillDescription = specialization.skillDescription || null;
        this.extraCurriculumActivities = specialization.extraCurriculumActivities || null;
    }

}
