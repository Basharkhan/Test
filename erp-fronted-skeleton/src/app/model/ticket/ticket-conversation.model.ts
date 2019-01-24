import {FuseUtils} from '@fuse/utils';
import {User} from '../auth/user.model';

export class TicketConversation {
    public id: string;
    public ticketConversationType: string;      // REPLY, NOTE, FACEBOOK, FEEDBACK;
    public incoming: boolean;
    public privateReply: boolean;
    public replyBy: User;
    public body: string;
    public bodyText: string;
    public fromEmail: string;
    public toEmails: string[];
    public ccEmailsList: string[];
    public bccEmailsList: string[];
    public forwardEmailsList: string[];
    public createdAt: Date;
    public createdAtAgo: string;
    public updatedAt: Date;
    public updatedAtAgo: string;
    public attachmentFileNameList: string[];
    public spam: boolean;
    public deleted: boolean;

    constructor(ticket?) {
        ticket = ticket || {};
        this.id = ticket.id || FuseUtils.generateGUID();
        this.ticketConversationType = ticket.ticketConversationType || null;
        this.incoming = ticket.incoming || null;
        this.privateReply = ticket.privateReply || null;
        this.replyBy = ticket.replyBy || null;
        this.body = ticket.body || null;
        this.bodyText = ticket.bodyText || null;
        this.fromEmail = ticket.fromEmail || null;
        this.toEmails = ticket.toEmails || null;
        this.ccEmailsList = ticket.ccEmailsList || null;
        this.bccEmailsList = ticket.bccEmailsList || null;
        this.forwardEmailsList = ticket.forwardEmailsList || null;
        this.createdAt = ticket.createdAt || null;
        this.createdAtAgo = ticket.createdAtAgo || null;
        this.updatedAt = ticket.updatedAt || null;
        this.updatedAtAgo = ticket.updatedAtAgo || null;
        this.attachmentFileNameList = ticket.attachmentFileNameList || null;
        this.spam = ticket.spam || null;
        this.deleted = ticket.deleted || null;
    }
}
