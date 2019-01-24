import {FuseUtils} from '@fuse/utils';

export class Language {
    public id: string;
    public name: string;

    constructor(language?) {
        language = language || {};
        this.id = language.id || FuseUtils.generateGUID();
        this.name = language.name || null;
    }
}
