import { FuseUtils } from './../../../@fuse/utils/index';

export class LeaveType {
    public leaveTypeId: string;
    public type: string;
    public maxTakenDaysPerYear: Number;
    public minJobDays: Number;

    constructor(leaveType?)
    {
        leaveType = leaveType || {};
        this.leaveTypeId = leaveType.leaveTypeId || FuseUtils.generateGUID();
        this.type = leaveType.type || null;
        this.maxTakenDaysPerYear = leaveType.maxTakenDaysPerYear || null;
        this.minJobDays = leaveType.minJobDays || null;
    }
}
