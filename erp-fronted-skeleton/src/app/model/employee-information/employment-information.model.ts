import {EmployeeDesignation} from '../office-information/employee-designation.model';


export class EmploymentInformation {
  public dateOfJoining: Date;
  public employeeDesignationList: EmployeeDesignation[];
  public confirmationDate: Date;
  public lastPromotionDate: Date;

  constructor(employmentInformation?) {
    employmentInformation = employmentInformation || {};
    this.dateOfJoining = employmentInformation.dateOfJoining || null;
    this.employeeDesignationList = employmentInformation.employeeDesignationList || null;
    this.confirmationDate = employmentInformation.confirmationDate || null;
    this.lastPromotionDate = employmentInformation.lastPromotionDate || null;
  }
}
