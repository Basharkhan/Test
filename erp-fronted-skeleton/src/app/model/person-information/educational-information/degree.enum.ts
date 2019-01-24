import { Component } from '@angular/core';

export class Degree {
    id: string;
    type: string;

    constructor(degree?) {
        degree = degree || {};
        this.id = degree.id || null;
        this.type = degree.type || null;
    }
}
