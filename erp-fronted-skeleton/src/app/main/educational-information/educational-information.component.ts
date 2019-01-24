import {AfterViewInit, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Employee } from '../../model/employee-information/employee.model';
import { Student } from '../../model/student-information/student.model';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { EducationalInformation } from '../../model/person-information/educational-information/educational-information.model';
import { EducationalInstitute } from '../../model/person-information/educational-information/educational-institute.model';
import { Country } from '../../model/person-information/contact-information/country.model';
import { DegreeConcentration } from '../../model/person-information/educational-information/degree-concentration.model';
import { FileType } from '../../model/file_server/file-type.model';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EmployeeService } from '../../service/user/employee/employee.service';
import { StudentService } from '../../service/user/student/student.service';
import { EducationalInstituteService } from '../../service/administrative/educational-institute/educational-institute.service';
import { CountryService } from '../../service/administrative/country/country.service';
import { DegreeConcentrationService } from '../../service/administrative/degree-concentration/degree-concentration.service';
import { EnumService } from '../../service/administrative/enum/enum.service';
import { FileServerService } from '../../service/user/file-upload/file-server.service';
import { DISTRICT_LIST } from '../../utilities/global-utility';
import { DegreeResultType } from '../../model/person-information/educational-information/degree-resul-type.enum';
import Utils from '../../utilities/utils';
import { FuseUtils } from '@fuse/utils';
import { Address } from '../../model/person-information/contact-information/address.model';


@Component({
    selector: 'educational-information',
    templateUrl: './educational-information.component.html',
    styleUrls: ['./educational-information.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class EducationalInformationComponent implements OnInit, AfterViewInit {

    @Input() userType: string;

    @Input() pageType: string;

    @Input() employee: Employee;

    @Input() student: Student;

    public educationInformationForm: FormGroup;
    public educationalInformation: EducationalInformation = new EducationalInformation();
    public educationalInformationList = new Array();
    public filteredInstituteList: string[];
    public filteredInstituteObjectList: EducationalInstitute[];
    public educationLevel: string;
    public educationInstituteName: string;
    public foreignEducationalInstitute = false;
    public newInstitute = false;
    public newDegreeConcentration = false;
    public educationalInstituteDistrict: string;
    public educationalInstituteCountry: Country = new Country();

    public countryList: Country[];
    public districtList: string[];
    public districtFilterList: string[] = new Array();
    public degreeConcentration: string;
    public degreeConcentrationList: string[];
    public degreeConcentrationObjectList: DegreeConcentration[];
    public degreeList: any;
    public educationLevelWithDegreeList: any;

    public degreeTitleRequired = false;
    public degreeDropDownRequired = true;
    public boardDropDownRequired = true;
    public marksPercentageRequired = false;
    public letterGradeRequired = true;
    public cgpaRequired = true;
    public cgpaWithoutFourthSubjectRequired = true;
    public scaleRequired = true;
    public degreeDivisionTypeRequired = false;
    public filteredBoardList: string[] = ['Dhaka', 'Barisal', 'Chittagong', 'Comilla', 'Dinajpur', 'Jessore', 'Rajshahi', 'Sylhet', 'Madrasah', 'Technical', 'DIBS (Dhaka)'];
    public passingYearList: number[] = new Array();


    public certificateFileType = FileType.EDUCATION_CERTIFICATE;
    public marksheetFileType = FileType.EDUCATION_MARKSHEET;
    public username: string;
    public allowedExtensionType: any = /image-*/;
    public fileServerBasePath: string;

    constructor(
        private _fuseProgressBarService: FuseProgressBarService,
        private _employeeService: EmployeeService,
        private _studentService: StudentService,
        private _educationalInstituteService: EducationalInstituteService,
        private _countryService: CountryService,
        private _degreeConcentrationService: DegreeConcentrationService,
        private _enumService: EnumService,
        private _formBuilder: FormBuilder) {
        this.fileServerBasePath = FileServerService.fileServerBasePath;

        for (let year = 2030; year > 1964; year--) {
            this.passingYearList.push(year);
        }
    }

    ngOnInit(): void {
        this.educationInformationForm = this.createForm();
        this.subscribeFieldValueChange();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.filteredInstituteList = new Array();

            this.getAllEducationLevelType();
            this.getCountryListByName('Bangladesh');
            this.districtList = DISTRICT_LIST;

            if (this.pageType === 'update') {

                if (this.userType === 'employee') {
                    this.username = this.employee.username;
                    if (this.employee.educationalInformationList !== undefined && this.employee.educationalInformationList != null
                        && this.employee.educationalInformationList.length > 0) {
                        this.educationalInformationList = this.employee.educationalInformationList;
                    } else {
                        this.educationalInformationList = new Array();
                    }
                } else if (this.userType === 'student') {
                    this.username = this.student.username;
                    if (this.student.educationalInformationList !== undefined && this.student.educationalInformationList != null
                        && this.student.educationalInformationList.length > 0) {
                        this.educationalInformationList = this.student.educationalInformationList;
                    } else {
                        this.educationalInformationList = new Array();
                    }
                }

            } else {

            }
        }, 1);
    }

    newForm(): void {
        this.educationalInformation = new EducationalInformation();
        this.degreeConcentration = '';
        this.educationInstituteName = '';
        this.educationLevel = '';
        this.degreeList = new Array();


        this.getAllEducationLevelType();
        this.getCountryListByName('Bangladesh');

        const degreeResultType = new DegreeResultType();
        degreeResultType.id = this.educationalInformation.degreeResult.degreeResultType + '';
        this.showGradeDivisionFiled(degreeResultType.id);

        this.educationInformationForm = this.createForm();
        this.subscribeFieldValueChange();
    }


    showGradeDivisionFiled(degreeResultType: string): void {
        if (degreeResultType === 'GRADE') {
            this.letterGradeRequired = true;
            this.cgpaRequired = true;
            this.cgpaWithoutFourthSubjectRequired = true;
            this.scaleRequired = true;
            this.boardDropDownRequired = true;
            this.marksPercentageRequired = false;
            this.degreeDivisionTypeRequired = false;
        } else if (degreeResultType === 'DIVISION') {
            this.degreeDivisionTypeRequired = true;
            this.marksPercentageRequired = true;
            this.letterGradeRequired = false;
            this.cgpaRequired = false;
            this.cgpaWithoutFourthSubjectRequired = false;
            this.scaleRequired = false;
            this.boardDropDownRequired = false;
        } else {
            this.letterGradeRequired = false;
            this.cgpaRequired = false;
            this.cgpaWithoutFourthSubjectRequired = false;
            this.scaleRequired = false;
            this.marksPercentageRequired = false;
            this.boardDropDownRequired = false;
            this.degreeDivisionTypeRequired = false;
        }
    }

    subscribeFieldValueChange(): void {

        this.educationInformationForm.get('degreeConcentration').valueChanges.subscribe(
            (degreeConcentration) => {
                // console.log(degreeConcentration);
                this.getDegreeConcentrationListByName(degreeConcentration);
            }
        );

        this.educationInformationForm.get('educationalInstitute').valueChanges.subscribe(
            (educationalInstitute) => {
                // console.log(degreeConcentration);
                this.getInstituteListByname(educationalInstitute);
            }
        );

        this.educationInformationForm.get('educationLevel').valueChanges.subscribe(
            (educationLevel) => {
                if (educationLevel != null && educationLevel.includes('PHD')) {
                    this.degreeTitleRequired = true;
                    this.degreeDropDownRequired = false;
                } else {
                    this.degreeTitleRequired = false;
                    this.degreeDropDownRequired = true;
                }
            }
        );

        this.educationInformationForm.get('degree').valueChanges.subscribe(
            (degree) => {
                if ((degree != null && degree.includes('OTHERS')) ||
                    (this.educationInformationForm.get('educationLevel').value != null && this.educationInformationForm.get('educationLevel').value.includes('PHD'))) {
                    this.degreeTitleRequired = true;
                } else {
                    this.degreeTitleRequired = false;
                }
            }
        );

        this.educationInformationForm.get('degreeResult.degreeResultType').valueChanges.subscribe(
            (degreeResultType) => {

                this.showGradeDivisionFiled(degreeResultType);

                this.letterGradeRequired ? this.educationInformationForm.get('degreeResult.letterGrade').setValidators([Validators.required]) :
                    this.educationInformationForm.get('degreeResult.letterGrade').clearValidators();
                this.educationInformationForm.get('degreeResult.letterGrade').updateValueAndValidity();

                this.cgpaRequired ? this.educationInformationForm.get('degreeResult.cgpa').setValidators([Validators.required]) :
                    this.educationInformationForm.get('degreeResult.cgpa').clearValidators();
                this.educationInformationForm.get('degreeResult.cgpa').updateValueAndValidity();

                this.cgpaWithoutFourthSubjectRequired ? this.educationInformationForm.get('degreeResult.cgpaWithoutFourthSubject').setValidators([Validators.required]) :
                    this.educationInformationForm.get('degreeResult.cgpaWithoutFourthSubject').clearValidators();
                this.educationInformationForm.get('degreeResult.cgpaWithoutFourthSubject').updateValueAndValidity();

                this.scaleRequired ? this.educationInformationForm.get('degreeResult.scale').setValidators([Validators.required]) :
                    this.educationInformationForm.get('degreeResult.scale').clearValidators();
                this.educationInformationForm.get('degreeResult.scale').updateValueAndValidity();

                this.boardDropDownRequired ? this.educationInformationForm.get('board').setValidators([Validators.required]) :
                    this.educationInformationForm.get('board').clearValidators();
                this.educationInformationForm.get('board').updateValueAndValidity();

                this.marksPercentageRequired ? this.educationInformationForm.get('degreeResult.marksPercentage').setValidators([Validators.required]) :
                    this.educationInformationForm.get('degreeResult.marksPercentage').clearValidators();
                this.educationInformationForm.get('degreeResult.marksPercentage').updateValueAndValidity();

                this.degreeDivisionTypeRequired ?  this.educationInformationForm.get('degreeResult.degreeDivisionType').setValidators([Validators.required]) :
                   this.educationInformationForm.get('degreeResult.degreeDivisionType').clearValidators();
                this.educationInformationForm.get('degreeResult.degreeDivisionType').updateValueAndValidity();
            }
        );


        // Update Country List depends on School Name
        this.educationInformationForm.get('educationalInstituteCountryName').valueChanges.subscribe(
            (searchedValue) => {
                this.getCountryListByName(searchedValue);
                this.countryList.forEach((country) => {
                    if (country.name === searchedValue) {
                        this.educationalInstituteCountry.id = country.id;
                        this.educationalInstituteCountry.name = country.name;
                        this.educationalInstituteCountry.code = country.code;
                    }
                });
            }
        );

        // Update District List depends on School Name
        this.educationInformationForm.get('educationalInstituteDistrict').valueChanges.subscribe(
            (searchedValue) => {
                this.educationalInstituteDistrict = this.educationInformationForm.get('educationalInstituteDistrict').value;
                this.districtFilterList = new Array();
                this.districtList.forEach((district) => {
                    if (district.includes(searchedValue)) {
                        this.districtFilterList.push(district);
                    }
                });
            }
        );
    }

    // EMPTY AUTOCOMPLETE FIELD IF NOT VALID START
    countryAutoCompletePanelClosed(): void {
        if (this.countryList.length === 0 || this.countryList.length === undefined) {
            this.educationInformationForm.get('educationalInstituteCountryName').setValue(null);
        } else {
            this.countryList.forEach((country) => {
                if (country.name === this.educationInformationForm.get('educationalInstituteCountryName').value) {
                    this.educationalInstituteCountry.id = country.id;
                    this.educationalInstituteCountry.name = country.name;
                    this.educationalInstituteCountry.code = country.code;
                }
            });
        }
    }

    private createForm(): any {
        return this._formBuilder.group({
            id: [this.educationalInformation.id],
            educationLevel: [this.educationLevel],
            degree: [this.educationalInformation.degree],
            degreeTitle: [this.educationalInformation.degreeTitle],
            degreeConcentration: [this.degreeConcentration],

            educationalInstitute: [this.educationInstituteName],
            foreignEducationalInstitute: [this.foreignEducationalInstitute],
            educationalInstituteDistrict: [this.educationalInstituteDistrict],
            educationalInstituteCountryName: [this.educationalInstituteCountry.name],
            board: [this.educationalInformation.board],
            degreeResult: this._formBuilder.group({
                degreeResultType: [this.educationalInformation.degreeResult.degreeResultType],
                degreeDivisionType: [this.educationalInformation.degreeResult.degreeDivisionType],
                marksPercentage: [this.educationalInformation.degreeResult.marksPercentage],
                letterGrade: [this.educationalInformation.degreeResult.letterGrade],
                rollNumber: [this.educationalInformation.degreeResult.rollNumber],
                registrationNumber: [this.educationalInformation.degreeResult.registrationNumber],
                cgpa: [this.educationalInformation.degreeResult.cgpa],
                cgpaWithoutFourthSubject: [this.educationalInformation.degreeResult.cgpaWithoutFourthSubject],
                scale: [this.educationalInformation.degreeResult.scale],
            }),
            yearOfPassing: [this.educationalInformation.yearOfPassing],
            duration: [this.educationalInformation.duration],
            achievement: [this.educationalInformation.achievement],
            scannedCopyOfCertificate: [this.educationalInformation.scannedCopyOfCertificate],
            scannedCopyOfMarkSheet: [this.educationalInformation.scannedCopyOfMarkSheet],
            verified: [this.educationalInformation.verified],
            verifiedBy: [this.educationalInformation.verifiedBy]
        });
    }

    selectedNavbar(educationalInformation: EducationalInformation): void {
        if (educationalInformation.id !== this.educationalInformation.id) {
            this.educationalInformation = educationalInformation;
            this.degreeConcentration = educationalInformation.degreeConcentration.concentration;
            this.educationInstituteName = educationalInformation.educationalInstitute.name;

            this.educationLevelWithDegreeList.forEach((educationLevelWithDegree) => {
                const degreeTypeList = educationLevelWithDegree['degree'];
                degreeTypeList.forEach((degree) => {
                    if (degree['id'] === educationalInformation.degree) {
                        this.educationLevel = educationLevelWithDegree.id;
                        this.degreeList = educationLevelWithDegree['degree'];
                    }
                });
            });


            if (this.pageType === 'update') {
                this.newInstitute = false;
            }

            const degreeResultType = new DegreeResultType();
            degreeResultType.id = this.educationalInformation.degreeResult.degreeResultType + '';
            this.showGradeDivisionFiled(degreeResultType.id);
            this.educationInformationForm = this.createForm();
            this.subscribeFieldValueChange();
        }
    }

    checkIsNewDegreeConcentration(): void {
        if (!this.educationalInformation.degreeConcentration ||
            this.educationalInformation.degreeConcentration !== this.educationInformationForm.controls['degreeConcentration'].value) {
            this.newDegreeConcentration = true;
        } else {
            this.newDegreeConcentration = false;
        }
    }

    degreeConcentrationSelected(degreeConcentration): void {
        this.educationalInformation.degreeConcentration = degreeConcentration;
        this.checkIsNewDegreeConcentration();
    }

    instituteSelected(instituteName): void {
        this.educationInstituteName = instituteName;
        this.checkIsNewInstitute();
    }

    checkIsNewInstitute(): void {
        if (!this.educationInstituteName ||
            this.educationInstituteName !== this.educationInformationForm.controls['educationalInstitute'].value) {
            this.newInstitute = true;
        } else {
            this.newInstitute = false;
        }

        this.educationInstituteName = this.educationInformationForm.controls['educationalInstitute'].value;

        this.newInstitute ? this.educationInformationForm.get('educationalInstituteDistrict').setValidators([Validators.required]) :
            this.educationInformationForm.get('educationalInstituteDistrict').clearValidators();
        this.educationInformationForm.get('educationalInstituteDistrict').updateValueAndValidity();

        this.newInstitute ? this.educationInformationForm.get('educationalInstituteCountryName').setValidators([Validators.required]) :
            this.educationInformationForm.get('educationalInstituteCountryName').clearValidators();
        this.educationInformationForm.get('educationalInstituteCountryName').updateValueAndValidity();
    }


    deleteDegree(educationalInformation: EducationalInformation, formDirective: FormGroupDirective): void {

        let formError = false;
        let index = 0;
        for (const educationInformationLoop of this.educationalInformationList) {
            if (educationInformationLoop.id === this.educationalInformation.id) {
                this.educationalInformationList.splice(index, 1);

                formError = false;

                if (!formError) {
                    if (this.userType === 'employee') {
                        this.employee.educationalInformationList = this.educationalInformationList;
                        console.log(this.employee.educationalInformationList);
                        this.updateEmployee(this.employee, formDirective);
                        formDirective.resetForm();
                    } else if (this.userType === 'student') {
                        this.student.educationalInformationList = this.educationalInformationList;
                        console.log(this.student.educationalInformationList);
                        this.updateStudent(this.student, formDirective);
                        formDirective.resetForm();
                    }
                }
                break;
            }
            index++;
        }
    }

    public saveForm(educationalInformation: EducationalInformation, formDirective: FormGroupDirective): void {

        let formError = false;
        if (educationalInformation.degreeResult.cgpa > educationalInformation.degreeResult.scale) {
            formError = true;
            Utils.showAlert('error', 'CGPA/GPA or Scale is Invalid', 'Scale can not less then your CGPA/GPA');
        }

        if (!formError) {

            let educationalInstitute = new EducationalInstitute();
            if (this.newInstitute) {
                educationalInstitute.id = FuseUtils.generateGUID();
                educationalInstitute.name = this.educationInstituteName;
                educationalInstitute.foreignInstitute =  this.educationInformationForm.controls['foreignEducationalInstitute'].value;
                educationalInstitute.address = new Address();
                educationalInstitute.address.country = new Country();
                educationalInstitute.address.district = this.educationalInstituteDistrict;
                educationalInstitute.address.country = this.educationalInstituteCountry;

                this.createEducationalInstitute(educationalInstitute, formDirective);
            } else {
                if (this.filteredInstituteObjectList == null) {
                    educationalInstitute = this.educationalInformation.educationalInstitute;
                } else {
                    this.filteredInstituteObjectList.forEach(institute => {
                        if (this.educationInstituteName.startsWith(institute.name)) {
                            educationalInstitute = institute;
                        }
                    });
                }
            }
            educationalInformation.educationalInstitute = educationalInstitute;

            let degreeConcentration = new DegreeConcentration();
            if (this.newDegreeConcentration) {
                degreeConcentration.id = FuseUtils.generateGUID();
                degreeConcentration.concentration = this.educationInformationForm.controls['degreeConcentration'].value;
                this.createDegreeConcentration(degreeConcentration, formDirective);
            } else {
                if (this.degreeConcentrationObjectList == null) {
                    degreeConcentration = this.educationalInformation.degreeConcentration;
                } else {
                    this.degreeConcentrationObjectList.forEach(degreeConcentrationObject => {
                        if (degreeConcentrationObject.concentration === this.educationInformationForm.controls['degreeConcentration'].value) {
                            degreeConcentration = degreeConcentrationObject;
                        }
                    });
                }
            }

            if (this.educationalInformation.scannedCopyOfCertificate != null && this.educationalInformation.scannedCopyOfCertificate !== '') {
                educationalInformation.scannedCopyOfCertificate = this.educationalInformation.scannedCopyOfCertificate;
            }

            if (this.educationalInformation.scannedCopyOfMarkSheet != null && this.educationalInformation.scannedCopyOfMarkSheet !== '') {
                educationalInformation.scannedCopyOfMarkSheet = this.educationalInformation.scannedCopyOfMarkSheet;
            }

            educationalInformation.degreeConcentration = degreeConcentration;

            if (this.educationalInformationList.length == null) {
                this.educationalInformationList = new Array();
            }

            let index = 0;


            let isEditForm = false;
            for (const educationInformationLoop of this.educationalInformationList) {
                if (educationInformationLoop.id === educationalInformation.id) {
                    isEditForm = true;

                    this.educationalInformationList[index] = educationalInformation;
                    break;
                }
                index++;
            }

            if (!isEditForm) {
                this.educationalInformationList.push(educationalInformation);
            }

            if (this.userType === 'employee') {
                this.employee.educationalInformationList = this.educationalInformationList;
                console.log(this.employee.educationalInformationList);
                this.updateEmployee(this.employee, formDirective);
            } else if (this.userType === 'student') {
                this.student.educationalInformationList = this.educationalInformationList;
                this.updateStudent(this.student, formDirective);
            }

            // Debugging which field causing invalid
            // const invalid = [];
            // const controls = this.educationInformationForm.controls;
            // for (const name in controls) {
            //     if (controls[name].invalid) {
            //         invalid.push(name);
            //     }
            // }
            // console.log(invalid);
            // Debugging which field causing invalid

            // console.log(educationalInformation);
        }
    }

    public educationLevelSelection(educationLevel: string): void {
        this.educationLevelWithDegreeList.forEach((educationLevelWithDegree) => {
            if (educationLevelWithDegree['id'] === educationLevel) {
                this.degreeList = educationLevelWithDegree['degree'];
                // console.log(educationLevelWithDegree['degree']);
            }
        });
        // console.log(this.degreeList);
    }

    receiveCertificateFileName($event): void {
        this.educationalInformation.scannedCopyOfCertificate = $event;
    }

    receiveMarksheetFileName($event): void {
        this.educationalInformation.scannedCopyOfMarkSheet = $event;
    }

    /*
__  __    _____  __          ___ __
/  `/  \|\ |||__)/  \|   |   |__ |__)
\__,\__/| \|||  \\__/|___|___|___|  \

*/
    private updateEmployee(employee: Employee, formDirective?: FormGroupDirective): void {
        this._fuseProgressBarService.show();
        this._employeeService.updateEmployeeEducationalInformation(employee).map((data) => {
            this._fuseProgressBarService.hide();
            Utils.showAlert('success', 'Success', 'Employee has been updated!');
            formDirective.resetForm();
            this.educationInformationForm.reset();
            this.newForm();
        }).subscribe(
            () => {
                // console.log(' NO ERROR FOUND ');
            },
            (error) => {
                this._fuseProgressBarService.hide();
                Utils.showAlert('error', 'Oops...', error.headers.get('messageDescription'));

                // console.log(JSON.stringify(error));
            }, () => {
                // console.log(' FINAL RESULT ');
            });
    }


    private getInstituteListByname(name: string = 'A', pageNumber: number = 0, pageSize: number = 10, sort: string = 'name:asc'): void {
        this._educationalInstituteService.getEducationalInstituteListByName(name, pageNumber, pageSize, sort).map((data) => {
            this.filteredInstituteList = new Array();
            this.filteredInstituteObjectList = new Array();
            this.filteredInstituteObjectList = data.body.content;

            data.body.content.forEach(institute => {
                this.filteredInstituteList.push(institute.name);
            });
        }).subscribe(
            () => {
                // console.log(' NO ERROR FOUND ');
            },
            (error) => {
                console.log('GOT AN ERROR:--> ' + JSON.stringify(error));
            });
    }


    private createEducationalInstitute(educationalInstitute: EducationalInstitute, formDirective?: FormGroupDirective): void {
        /*
        this._fuseProgressBarService.show();
        this._educationalInstituteService.createEducationalInstitute(educationalInstitute).map((data) => {
            this._fuseProgressBarService.hide();
            // Utils.showAlert('success', 'Success', 'EducationalInstitute has been saved!');
            // formDirective.resetForm();
        }).subscribe(
            () => {
                // console.log(' NO ERROR FOUND ');
            },
            (error) => {
                this._fuseProgressBarService.hide();
                // Utils.showAlert('error', 'Oops...', error.headers.get('messageDescription'));

                // console.log(JSON.stringify(error));
            }, () => {
                // console.log(' FINAL RESULT ');
            });
            */
    }


    private getCountryListByName(name: string = 'Bangladesh', pageNumber: number = 0, pageSize: number = 10, sort: string = 'name:asc'): any {

        this._fuseProgressBarService.show();
        this._countryService.getCountryListByName(name, pageNumber, pageSize, sort).map((data) => {
            this.countryList = data.body.content;

            this._fuseProgressBarService.hide();
        }).subscribe(
            () => {
                // console.log(' NO ERROR FOUND ');
            },
            (error) => {
                this._fuseProgressBarService.hide();
                console.log('GOT AN ERROR:--> ' + JSON.stringify(error));
            });
    }

    private getAllEducationLevelType(): any {
        this._fuseProgressBarService.show();
        this._enumService.getEducationLevelTypeList().map((educationLevelWithDegree) => {
            this.educationLevelWithDegreeList = educationLevelWithDegree.body;
            // console.log(this.educationLevelWithDegreeList);

            this._fuseProgressBarService.hide();
        }).subscribe(
            () => {
                // console.log(' NO ERROR FOUND ');
            },
            (error) => {
                this._fuseProgressBarService.hide();
                console.log('GOT AN ERROR:--> ' + JSON.stringify(error));
            });
    }

    private getDegreeConcentrationListByName(concentration: string, pageNumber: number = 0, pageSize: number = 10, sort: string = 'concentration:asc'): any {
        this._fuseProgressBarService.show();
        this._degreeConcentrationService.getDegreeConcentrationListByName(concentration, pageNumber, pageSize, sort).map((data) => {
            this.degreeConcentrationList = new Array();
            this.degreeConcentrationObjectList = new Array();
            this.degreeConcentrationObjectList = data.body.content;

            data.body.content.forEach(degreeConcentrate => {
                this.degreeConcentrationList.push(degreeConcentrate.concentration);
            });

            // console.log(this.degreeConcentrationList);

            this._fuseProgressBarService.hide();
        }).subscribe(
            () => {
                // console.log(' NO ERROR FOUND ');
            },
            (error) => {
                this._fuseProgressBarService.hide();
                console.log('GOT AN ERROR:--> ' + JSON.stringify(error));
            });
    }

    private createDegreeConcentration(degreeConcentration: DegreeConcentration, formDirective: FormGroupDirective): void {
        this._fuseProgressBarService.show();
        this._degreeConcentrationService.createDegreeConcentration(degreeConcentration).map((data) => {
            this._fuseProgressBarService.hide();
            // Utils.showAlert('success', 'Success', 'Degree Concentration has been saved!');
            formDirective.resetForm();
        }).subscribe(
            () => {
                // console.log(' NO ERROR FOUND ');
            },
            (error) => {
                this._fuseProgressBarService.hide();
                // Utils.showAlert('error', 'Oops...', error.headers.get('messageDescription'));

                // console.log(JSON.stringify(error));
            }, () => {
                // console.log(' FINAL RESULT ');
            });
    }

    private updateStudent(student: Student, formDirective?: FormGroupDirective): void {
        this._fuseProgressBarService.show();
        this._studentService.updateStudentEducationalInformation(student).map((data) => {
            this._fuseProgressBarService.hide();
            Utils.showAlert('success', 'Success', 'Student has been updated!');
            formDirective.resetForm();
            this.educationInformationForm.reset();
            this.newForm();
        }).subscribe(
            () => {
                // console.log(' NO ERROR FOUND ');
            },
            (error) => {
                this._fuseProgressBarService.hide();
                Utils.showAlert('error', 'Oops...', error.headers.get('messageDescription'));

                // console.log(JSON.stringify(error));
            }, () => {
                // console.log(' FINAL RESULT ');
            });
    }
}
