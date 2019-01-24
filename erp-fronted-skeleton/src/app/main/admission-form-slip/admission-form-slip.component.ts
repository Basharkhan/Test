import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AcademicProgramService } from '../../service/academic/academic-program/academic-program.service';
import { AcademicProgram } from '../../model/academic/academic-program.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EduInfoModalComponent } from './edu-info-modal/edu-info-modal.component';
import { Employee } from '../../model/employee-information/employee.model';
import { EmployeeService } from '../../service/user/employee/employee.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

export interface AboutUniversity {
  value: string;
}

@Component({
  selector: 'app-admission-form-slip',
  templateUrl: './admission-form-slip.component.html',
  styleUrls: ['./admission-form-slip.component.scss']
})
export class AdmissionFormSlipComponent implements OnInit {

  admissionFormSlip: FormGroup;
  academicProgramList: AcademicProgram[];
  employeeNameList: string[];
  employee: Employee[];

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  constructor(private employeeService: EmployeeService, private matDialog: MatDialog, private academicProgramService: AcademicProgramService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.admissionFormSlip = this.formBuilder.group({
      name: this.formBuilder.group({
        salutationType: [null],
        firstName: [null],
        middleName: [null],
        lastName: [null],
        suffix: [null]
      }),
      program: this.formBuilder.group({
        name: [null]
      }),
      mobileNo: this.formBuilder.group({
        phoneType: [null],
        countryCode: [null],
        areaCode: [null],
        number: [null],
        extention: [null]
      })
    });

    this.academicProgramService.getAcademicProgram()
        .subscribe( data => {
            this.academicProgramList = JSON.parse(JSON.stringify(data.body.content));
            console.log(this.academicProgramList);
          }, err => {
            console.log(err);
        });        

    this.getEmployeeListByName(name);
  
    // const name = 'bashar';
    // this.employeeService.getEmployee()
    //     .subscribe( data => {
    //       this.employeeNameList = new Array();
    //       this.employee = JSON.parse(JSON.stringify(data.body.content));
    //       console.log('hello employee!', this.employee);
    //       this.employee.forEach(element => {
    //         this.employeeNameList.push(element.name.firstName)
    //       });
    //       console.log('Employee Name', this.employeeNameList);
    //     }, err => {
    //       console.log(err);
    //     });  
        
        // this.filteredOptions = this.myControl.valueChanges
        // .pipe(
        //   startWith(''),
        //   map(value => this._filter(value))
        // );         
  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.employeeNameList.filter(option => option.toLowerCase().includes(filterValue));
  // }
  

  aboutUniversity: AboutUniversity[] = [
    {value: 'University Student/Ex-Student'},
    {value: 'Newspaper (please specify)'},
    {value: 'University Web site'},
    {value: 'University Staff/teacher'},
    {value: 'Others'}
  ]

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '1070px';
    dialogConfig.maxHeight = '600px';
    const dialogRef = this.matDialog.open(EduInfoModalComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(result => {
        console.log(result);           
    });

  }

  saveAdmissionFormSlip(): void{
    console.log(this.admissionFormSlip.value);
  }

      //   private getInstituteListByname(name: string = 'A', pageNumber: number = 0, pageSize: number = 10, sort: string = 'name:asc'): void {
      //     this._educationalInstituteService.getEducationalInstituteListByName(name, pageNumber, pageSize, sort).map((data) => {
      //         this.filteredInstituteList = new Array();
      //         this.filteredInstituteObjectList = new Array();
      //         this.filteredInstituteObjectList = data.body.content;
  
      //         data.body.content.forEach(institute => {
      //             this.filteredInstituteList.push(institute.name);
      //         });
      //     }).subscribe(
      //         () => {
      //             // console.log(' NO ERROR FOUND ');
      //         },
      //         (error) => {
      //             console.log('GOT AN ERROR:--> ' + JSON.stringify(error));
      //         });
      // }
  
        private getEmployeeListByName(name: string, pageNumber: number = 0, pageSize: number = 10, sort: string = 'name:asc'): void {
          this.employeeService.getEmployeeListByName(name, pageNumber, pageSize, sort).map((data) => {
              this.employeeNameList = new Array();
      
  
              data.body.content.forEach(institute => {
                  this.employeeNameList.push(institute.name.firstName);
              });
          }).subscribe(
              () => {
                  // console.log(' NO ERROR FOUND ');
              },
              (error) => {
                  console.log('GOT AN ERROR:--> ' + JSON.stringify(error));
              });
      }      

}
