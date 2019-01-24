import {FuseUtils} from '@fuse/utils';
import {User} from '../auth/user.model';

export class TicketChecklist {
    public id: string;
    public user: User;
    public addedTime: Date;
    public addedTimeAgo: string;
    public checkItemName: string;
    public checkItemStatus: boolean;

    constructor(ticketChecklist?) {
        ticketChecklist = ticketChecklist || {};
        this.id = ticketChecklist.id || FuseUtils.generateGUID();
        this.user = ticketChecklist.user || null;
        this.addedTime = ticketChecklist.addedTime || null;
        this.addedTimeAgo = ticketChecklist.addedTimeAgo || null;
        this.checkItemName = ticketChecklist.checkItemName || null;
        this.checkItemStatus = ticketChecklist.checkItemStatus || null;
    }
}
