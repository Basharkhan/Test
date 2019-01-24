import {Address} from '../contact-information/address.model';
import {FuseUtils} from '@fuse/utils';

export class Training {
    public id: string;
    public title: string;
    public type: string;
    public topicsCovered: string;
    public startDate: Date;
    public endDate: Date;
    public instituteName: string;
    public location: Address;
    public scannedCopyOfCertificate: string;

    constructor(training?) {
        training = training || {};
        this.id = training.id || FuseUtils.generateGUID();
        this.title = training.title || null;
        this.type = training.type || null;
        this.topicsCovered = training.topicsCovered || null;
        this.startDate = training.startDate || null;
        this.endDate = training.endDate || null;
        this.instituteName = training.instituteName || null;
        this.location = training.location || [{}];
        this.scannedCopyOfCertificate = training.scannedCopyOfCertificate || null;
    }
}
