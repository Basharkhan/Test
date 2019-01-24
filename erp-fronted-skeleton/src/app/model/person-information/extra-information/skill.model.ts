import {FuseUtils} from '@fuse/utils';

export class Skill {
    public id: string;
    public type: string;

    constructor(skill?) {
        skill = skill || {};
        this.id = skill.id || FuseUtils.generateGUID();
        this.type = skill.type || null;
    }

}
