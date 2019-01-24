import { Component } from '@angular/core';
import { PhoneType } from './phone-type.enum';
import { FuseUtils } from '@fuse/utils';

export class Phone {
    public id: string;
    public phoneType: PhoneType;
    public countryCode: string;
    public areaCode: string;
    public number: string;
    public extension: number;
    public primary: boolean;

    constructor(phone?) {
      phone = phone || {};
      this.id = phone.id || FuseUtils.generateGUID();
      this.phoneType = phone.phoneType || null;
      this.countryCode = phone.countryCode || null;
      this.areaCode = phone.areaCode || null;
      this.number = phone.number || null;
      this.extension = phone.extension || null;
      this.primary = phone.primary || false;
    }
}
