import { LeaveType } from './leave-type.model';
import { Employee } from './../employee-information/employee.model';
import { FuseUtils } from './../../../@fuse/utils/index';

export class ApplyForLeave {
    public applyForLeaveId: string;
    public employee: Employee;
    public leaveType: LeaveType;
    public purposeOfLeave: String;
    public leaveFrom: Date;
    public leaveTo: Date;
    public personWhoWillCarryDuties: Employee;
    public approvedLeaveType: LeaveType;
    public approvedLeaveFrom: Date;
    public approvedLeaveTo: Date;
    public withOutPay: boolean;
    public comment: String;

    constructor(applyForLeave?)
    {
        applyForLeave = applyForLeave || {};
        this.applyForLeaveId = applyForLeave.applyForLeaveId || FuseUtils.generateGUID();
        this.employee = applyForLeave.employee || null;
        this.leaveType = applyForLeave.leaveType || null;
        this.purposeOfLeave = applyForLeave.purposeOfLeave || null;
        this.leaveFrom = applyForLeave.leaveFrom || null;
        this.leaveTo = applyForLeave.leaveTo || null;
        this.personWhoWillCarryDuties = applyForLeave.personWhoWillCarryDuties || null;
        this.approvedLeaveType = applyForLeave.approvedLeaveType || null;
        this.approvedLeaveFrom = applyForLeave.approvedLeaveFrom || null;
        this.approvedLeaveTo = applyForLeave.approvedLeaveTo || null;
        this.withOutPay = applyForLeave.withOutPay || null;
        this.comment = applyForLeave.comment || null;
    }
}
