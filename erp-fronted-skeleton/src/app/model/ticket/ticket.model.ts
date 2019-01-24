import {FuseUtils} from '@fuse/utils';
import {User} from '../auth/user.model';
import {TicketConversation} from './ticket-conversation.model';
import {TicketActivity} from './ticket-activity.model';
import {TicketChecklist} from './ticket-checklist.model';

export class Ticket {
    public id: string;
    public user: User;
    public subject: string;
    public ticketType: string;      // QUESTION, INCIDENT, PROBLEM, FEATURE_REQUEST, IMPROVEMENT, BUG, SUGGESTION, TASK;
    public ticketStatus: string;    // OPEN, PENDING, RESOLVED, CLOSED;
    public ticketPriority: string;  // LOW, MEDIUM, HIGH, URGENT;
    public description: string;
    public descriptionText: string;
    public agentAssigned: User;
    public attachmentFileNameList: string[];
    public ccEmailsList: string[];
    public bccEmailsList: string[];
    public forwardEmailsList: string[];
    public tagList: string[];
    public dueBy: Date;
    public createdAt: Date;
    public createdAtAgo: string;
    public updatedAt: Date;
    public updatedAtAgo: string;
    public spam: boolean;
    public deleted: boolean;
    public escalatedForTime: boolean;
    public escalated: boolean;
    public ticketConversationList: TicketConversation[];
    public ticketChecklist: TicketChecklist[];
    public ticketActivityList: TicketActivity[];

    constructor(ticket?) {
        ticket = ticket || {};
        this.id = ticket.id || FuseUtils.generateGUID();
        this.user = ticket.user || null;
        this.subject = ticket.subject || null;
        this.ticketType = ticket.ticketType || null;
        this.ticketStatus = ticket.ticketStatus || null;
        this.ticketPriority = ticket.ticketPriority || null;
        this.description = ticket.description || null;
        this.descriptionText = ticket.descriptionText || null;
        this.agentAssigned = ticket.agentAssigned || null;
        this.attachmentFileNameList = ticket.attachmentFileNameList || null;
        this.ccEmailsList = ticket.ccEmailsList || null;
        this.bccEmailsList = ticket.bccEmailsList || null;
        this.forwardEmailsList = ticket.forwardEmailsList || null;
        this.tagList = ticket.tagList || null;
        this.dueBy = ticket.dueBy || null;
        this.createdAt = ticket.createdAt || null;
        this.createdAtAgo = ticket.createdAtAgo || null;
        this.updatedAt = ticket.updatedAt || null;
        this.updatedAtAgo = ticket.updatedAtAgo || null;
        this.spam = ticket.spam || null;
        this.deleted = ticket.deleted || null;
        this.escalatedForTime = ticket.escalatedForTime || null;
        this.escalated = ticket.escalated || null;
        this.ticketConversationList = ticket.ticketConversationList || null;
        this.ticketChecklist = ticket.ticketChecklist || null;
        this.ticketActivityList = ticket.ticketActivityList || null;
    }
}
