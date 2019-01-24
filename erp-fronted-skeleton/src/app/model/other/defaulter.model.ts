import {User} from '../auth/user.model';
import {FuseUtils} from '../../../@fuse/utils';

export class Defaulter {
    public id: string;
    public setBy: User;
    public setOn: Date;
    public removedBy: User;
    public removedOn: Date;
    public defaulterType: string;

    constructor(defaulter?) {
        defaulter = defaulter || {};
        this.id = defaulter.id || FuseUtils.generateGUID();
        this.setBy = defaulter.setBy || null;
        this.setOn = defaulter.setOn || null;
        this.removedBy = defaulter.removedBy || null;
        this.removedOn = defaulter.removedOn || null;
        this.defaulterType = defaulter.defaulterType || null;
    }
}
