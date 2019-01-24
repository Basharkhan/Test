import {FuseUtils} from '@fuse/utils';
import {User} from '../auth/user.model';

export class TicketActivity {
    public id: string;
    public user: User;
    public activityTime: Date;
    public activityTimeAgo: string;
    public activityType: string;
    public activityMessage: string;

    constructor(ticketActivity?) {
        ticketActivity = ticketActivity || {};
        this.id = ticketActivity.id || FuseUtils.generateGUID();
        this.user = ticketActivity.user || null;
        this.activityTime = ticketActivity.activityTime || null;
        this.activityTimeAgo = ticketActivity.activityTimeAgo || null;
        this.activityType = ticketActivity.activityType || null;
        this.activityMessage = ticketActivity.activityMessage || null;
    }
}
