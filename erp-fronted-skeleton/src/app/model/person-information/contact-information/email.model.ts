import { FuseUtils } from './../../../../@fuse/utils/index';
import { Component } from '@angular/core';
import { EmailType } from './email-type.enum';

export class Email {
  public id: string;
  public emailType: EmailType;
  public address: string;
  public primary: boolean;

  constructor(email?) {
    email = email || {};
    this.id = email.id || FuseUtils.generateGUID();
    this.emailType = email.emailType || {};
    this.address = email.address || null;
    this.primary = email.primary || null;
  }
}
