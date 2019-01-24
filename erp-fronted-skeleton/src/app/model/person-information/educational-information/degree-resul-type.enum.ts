import { Component } from '@angular/core';

export class DegreeResultType {
    id: string;
    name: string;

    constructor(degreeResultType?) {
        degreeResultType = degreeResultType || {};
        this.id = degreeResultType.id || null;
        this.name = degreeResultType.name || null;
    }
}
