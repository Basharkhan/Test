import { Component } from '@angular/core';

export class BloodGroup {
    public id: string;
    public type: string;

    constructor(bloodGroup?)
    {
        bloodGroup = bloodGroup || {};
        this.id = bloodGroup.id || null;
        this.type = bloodGroup.type || null;
    }
}
