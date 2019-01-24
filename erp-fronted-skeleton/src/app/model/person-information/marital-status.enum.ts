import { Component } from '@angular/core';

export class MaritalStatus {
    public id: string;
    public type: string;

    constructor(maritalStatus?)
    {
        maritalStatus = maritalStatus || {};
        this.id = maritalStatus.id || null;
        this.type = maritalStatus.type || null;
    }
}
