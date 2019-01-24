import {FuseUtils} from '@fuse/utils';

export class StandardizedTest {
    public id: string;
    public shortName: string;
    public fullName: string;
    public totalScore: number;

    constructor(standardizedTest?) {
        standardizedTest = standardizedTest || {};
        this.id = standardizedTest.id || FuseUtils.generateGUID();
        this.shortName = standardizedTest.shortName || null;
        this.fullName = standardizedTest.fullName || null;
        this.totalScore = standardizedTest.totalScore || null;
    }
}
