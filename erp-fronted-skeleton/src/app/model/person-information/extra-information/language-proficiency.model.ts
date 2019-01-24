import {Language} from './language.model';
import {FuseUtils} from '@fuse/utils';

export class LanguageProficiency {

    public id: string;
    public language: Language;
    public readingProficiency: string;
    public writingProficiency: string;
    public speakingProficiency: string;

    constructor(languageProficiency?) {
        languageProficiency = languageProficiency || {};
        this.id = languageProficiency.id || FuseUtils.generateGUID();
        this.language = languageProficiency.language || null;
        this.readingProficiency = languageProficiency.readingProficiency || null;
        this.writingProficiency = languageProficiency.writingProficiency || null;
        this.speakingProficiency = languageProficiency.speakingProficiency || null;
    }
}
