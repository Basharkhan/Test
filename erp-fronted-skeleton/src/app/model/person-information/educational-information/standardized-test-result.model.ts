import {StandardizedTest} from './standardized-test.model';

export class StandardizedTestResult {
    public standardizedTest: StandardizedTest;
    public result: number;

    constructor(standardizedTestResult?) {
        standardizedTestResult = standardizedTestResult || {};
        this.standardizedTest = standardizedTestResult.standardizedTest || null;
        this.result = standardizedTestResult.result || null;
    }
}
