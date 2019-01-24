import { Degree } from './degree.enum';
import { Component } from '@angular/core';

export class EducationalLevel {
    id: string;
    type: string;
    degree: Degree[];

    constructor(educationalLevel?) {
        educationalLevel = educationalLevel || {};
        this.id = educationalLevel.id || null;
        this.type = educationalLevel.type || null;
        this.degree = educationalLevel.degree || null;
    }
}
