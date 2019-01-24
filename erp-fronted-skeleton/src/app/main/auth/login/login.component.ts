import {ActivatedRoute, Router} from '@angular/router';
import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {fuseAnimations} from '../../../../@fuse/animations';
import {FuseConfigService} from '../../../../@fuse/services/config.service';
import {AuthService} from '../../../service/auth/auth.service';
import * as JWT from 'jwt-decode';
import {User} from '../../../model/auth/user.model';
import {CookieService} from 'ngx-cookie-service';
import {EmployeeService} from '../../../service/user/employee/employee.service';
import {Employee} from '../../../model/employee-information/employee.model';
import {StudentService} from '../../../service/user/student/student.service';
import {FuseProgressBarService} from '../../../../@fuse/components/progress-bar/progress-bar.service';
import {EnumService} from '../../../service/administrative/enum/enum.service';
import {Service} from '../../../model/auth/service.model';
import {Operation} from '../../../model/auth/operation.model';
import {FuseNavigationService} from '../../../../@fuse/components/navigation/navigation.service';
import {RouterGuard} from '../../../service/auth/router.guard';
import { HttpClient } from '@angular/common/http';
import {Name} from '../../../model/person-information/extra-information/name.model';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styles: [`
        #ums_theme_options {
            display: none;
        }

        .snackBar-error {
            color: hotpink;
        }`
    ],
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit, AfterViewInit {

    returnUrl: string;
    loginForm: FormGroup;
    loginFormErrors: any;
    employee: Employee;
    serviceList: Service[];
    operationList: Operation[];
    user: User = new User();
    public routerGuard: RouterGuard = new RouterGuard();
    ipAddress = 'Unknown';

    constructor(
        private http: HttpClient,
        private _fuseProgressBarService: FuseProgressBarService,
        private _fuseConfigService: FuseConfigService,
        public _snackBar: MatSnackBar,
        private _formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private _cookieService: CookieService,
        private router: Router,
        private authService: AuthService,
        private _employeeService: EmployeeService,
        private _studentService: StudentService,
        private _enumService: EnumService,
        private _fuseNavigationService: FuseNavigationService
    ) {
        this.http.get('https://api.ipify.org?format=json').subscribe(data => {
            this.ipAddress = data['ip'];
        });

        this.getServiceList();
        this.getOperationList();

        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                }
            },
            showConfigSettingButton: true,
        };

        this.loginFormErrors = {
            username: {},
            password: {}
        };

        // reset login status
        // this.authService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/sample';
    }

    ngOnInit(): void {

        this.loginForm = this._formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            if (localStorage.getItem('user') != null) {

                const user: User = JSON.parse(localStorage.getItem('user'));
                const tokenExpiryTime: number = user.tokenExpiredAt;
                const currentTimeInMs: number = Math.round(Date.now() / 1000);

                if (tokenExpiryTime < currentTimeInMs) {
                    this._cookieService.deleteAll();
                    this.router.navigate(['login']);
                    return false;
                } else {

                    this.router.navigate(['sample']);    // CHANGE BASED ON ROLE
                    console.log('AA');
                    /*
                    if (user.type === 'EMPLOYEE') {
                        this.router.navigate(['/sample']);    // CHANGE BASED ON ROLE
                    } else if (user.type === 'STUDENT') {
                        this.router.navigate(['/sample']);    // CHANGE BASED ON ROLE
                    }*/
                }


            }
        }, 1);
    }

    onLoginFormValuesChanged(): void {
        for (const field in this.loginFormErrors) {
            if (!this.loginFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }

    onSubmit(): void {
        this._fuseProgressBarService.show();
        const username = this.loginForm.get('username').value;
        const password = this.loginForm.get('password').value;
        this.authService.login(username, password).map((data2) => {
            this._fuseProgressBarService.show();
            this.authService.changeAllowedIp(this.ipAddress).map((data) => {

                const userToken_encode = data.access_token;
                const accessTokenData: any = JWT(userToken_encode);
                const issuer = accessTokenData.iss;
                const authorizedTo = accessTokenData.sub;
                const expiredTokenMs = accessTokenData.exp;
                const currentTimeMs = new Date().getMilliseconds();
                const accountNonExpired = accessTokenData.accountNonExpired;
                const accountNonLocked = accessTokenData.accountNonLocked;
                const credentialsNonExpired = accessTokenData.credentialsNonExpired;
                const enabled = accessTokenData.enabled;
                const userType = accessTokenData.type;

                if (issuer !== 'seu-erp-auth') {
                    this.showSnackBar('Error: ' + 'Authorization Issuer Not Valid!', '', 3000);
                } else if (authorizedTo !== username) {
                    this.showSnackBar('Error: ' + 'This token is not issued for you!', '', 3000);
                } else if (currentTimeMs > expiredTokenMs) {
                    this.showSnackBar('Error: ' + 'Token Expired!', '', 3000);
                } else if (!accountNonExpired) {
                    this.showSnackBar('Error: ' + 'Your account is expired!', '', 3000);
                } else if (!accountNonLocked) {
                    this.showSnackBar('Error: ' + 'Your account is locked!', '', 3000);
                } else if (!credentialsNonExpired) {
                    this.showSnackBar('Error: ' + 'Your credentials is expired!', '', 3000);
                } else if (!enabled) {
                    this.showSnackBar('Error: ' + 'Your account is not enabled!', '', 3000);
                } else {
                    this.setAuthorization(accessTokenData);
                    const issuedTokenMs = accessTokenData.iat;
                    this.user.username = authorizedTo;
                    this.user.tokenIssuedAt = issuedTokenMs;
                    this.user.tokenExpiredAt = expiredTokenMs;
                    this.user.accountNonExpired = accountNonExpired;
                    this.user.accountNonLocked = accountNonLocked;
                    this.user.credentialsNonExpired = credentialsNonExpired;
                    this.user.enabled = enabled;
                    this.user.type = userType;
                    this.user.name = new Name();
                    this.user.name.firstName = 'Unknown';
                    this.user.name.lastName = 'Person';
                    localStorage.setItem('user', JSON.stringify(this.user));

                    if (this.user.type === 'EMPLOYEE') {
                        this.getEmployeeDetailsByUsername(this.user, accessTokenData);
                    }
                    else if (this.user.type === 'STUDENT') {
                        // this.getStudentDetailsById(this.user, accessTokenData);
                    }

                    this._fuseProgressBarService.hide();
                }
            }).subscribe(
                () => {
                    // console.log(" NO ERROR FOUND ");
                },
                (error) => {
                    this._fuseProgressBarService.hide();
                    console.log(JSON.stringify(error));
                    this.showSnackBar('Error: ' + 'Failed to get your public IP', '', 3000);
                });

        }).subscribe(
            () => {
                // console.log(" NO ERROR FOUND ");
            },
            (error) => {
                this._fuseProgressBarService.hide();
                console.log(JSON.stringify(error));
                this.showSnackBar('Error: ' + 'Login Failed', '', 3000);
            });


    }

    private redirectToDashboard(): void {
        this.showSnackBar('Login Success', '', 1000);

        this.router.navigate(['sample']);
        // if (this.user.type === 'EMPLOYEE') {
        //     this.router.navigate(['/employee/dashboard']);    // CHANGE BASED ON ROLE
        // } else if (this.user.type === 'STUDENT') {
        //     this.router.navigate(['/student/dashboard']);    // CHANGE BASED ON ROLE
        // }
    }

    private setSampleNavBar(user: User): void {

        const navigationBar = [];

        // ========>>>>>>>>>> NAVIGATION GENERATE START

        if (this.user.type === 'EMPLOYEE') {
                // Sample Push
                const sampleBar =
                    {
                        id: 'dashboard',
                        title: 'Sample',
                        type: 'group',
                        children: [
                            {
                                id: 'my_dashboard',
                                title: 'Sample Page One',
                                type: 'item',
                                icon: ['fas', 'ticket-alt'],
                                url: '/sample',
                                // badge    : {
                                //     title    : '25',
                                //     bg       : '#F44336',
                                //     fg       : '#FFFFFF'
                                // }
                            },
                            {
                                id: 'admission_form_slip',
                                title: 'Admission Form Slip',
                                type: 'item',
                                icon: ['fas', 'ticket-alt'],
                                url: '/admission-form-slip',
                                // badge    : {
                                //     title    : '25',
                                //     bg       : '#F44336',
                                //     fg       : '#FFFFFF'
                                // }
                            }
                        ]
                    };

                navigationBar.push(sampleBar);
            }
        localStorage.setItem('navigationBar', JSON.stringify(navigationBar));
        // ========>>>>>>>>>> NAVIGATION GENERATE END
    }

    private setEmployeeNavBar(user: User): void {

        const navigationBar = [];

        // ========>>>>>>>>>> NAVIGATION GENERATE START

        if (this.user.type === 'EMPLOYEE') {
            // Dashboard Push
            const dashboardBar =
                {
                    id       : 'dashboard',
                    title    : 'Dashboard',
                    type     : 'group',
                    children : [
                        {
                            id       : 'dashboard',
                            title    : 'Dashboard',
                            type     : 'item',
                            icon     : 'dashboard',
                            url      : '/employee/dashboard',
                            // badge    : {
                            //     title    : '25',
                            //     bg       : '#F44336',
                            //     fg       : '#FFFFFF'
                            // }
                        }
                    ]
                };
            navigationBar.push(dashboardBar);


            // Ticket Push
            const ticketBar =
                {
                    id       : 'ticket',
                    title    : 'Ticket',
                    type     : 'group',
                    children : [
                        {
                            id       : 'ticket',
                            title    : 'My Ticket',
                            type     : 'item',
                            icon: ['fas', 'ticket-alt'],
                            url      : '/ticket/list',
                            // badge    : {
                            //     title    : '25',
                            //     bg       : '#F44336',
                            //     fg       : '#FFFFFF'
                            // }
                        },
                        {
                            id       : 'assigned_ticket',
                            title    : 'Assigned Ticket',
                            type     : 'item',
                            icon: ['fas', 'check-double'],
                            url      : '/ticket/assigned_list',
                            // badge    : {
                            //     title    : '25',
                            //     bg       : '#F44336',
                            //     fg       : '#FFFFFF'
                            // }
                        }
                    ]
                };

            if (this.routerGuard.hasAccessToDoOperation('LIST_TICKET')) {
                const bar =
                    {
                        id       : 'all_ticket',
                        title    : 'All Ticket',
                        type     : 'item',
                        icon: ['fas', 'list-alt'],
                        url      : '/ticket/all',
                        // badge    : {
                        //     title    : '25',
                        //     bg       : '#F44336',
                        //     fg       : '#FFFFFF'
                        // }
                    };
                ticketBar.children.push(bar);
            }
            navigationBar.push(ticketBar);

            // HR Push
            if (this.routerGuard.hasAccessToDoOperation('LIST_OFFICE') || this.routerGuard.hasAccessToDoOperation('LIST_DESIGNATION')
                || this.routerGuard.hasAccessToDoOperation('LIST_EMPLOYMENT_TYPE') || this.routerGuard.hasAccessToDoOperation('LIST_EMPLOYEE')) {

                const hrBar =
                    {
                        id: 'hr_service',
                        title: 'HR',
                        type: 'group',
                        children : []
                    };

                if (this.routerGuard.hasAccessToDoOperation('LIST_OFFICE')) {
                    const bar =
                        {
                            id: 'list_office',
                            title: 'Office',
                            type: 'item',
                            icon: ['far', 'building'],
                            url: '/office/list',
                            // badge    : {
                            //     title    : 'Done',
                            //     bg       : '#F44336',
                            //     fg       : '#FFFFFF'
                            // }
                        };
                    hrBar.children.push(bar);
                }

                if (this.routerGuard.hasAccessToDoOperation('LIST_RANK')) {
                    const bar =
                        {
                            id: 'list_rank',
                            title: 'Rank',
                            type: 'item',
                            icon: ['fas', 'code-branch'],
                            url: '/rank/list',
                            // badge    : {
                            //     title    : 'Done',
                            //     bg       : '#F44336',
                            //     fg       : '#FFFFFF'
                            // }
                        };
                    hrBar.children.push(bar);
                }

                if (this.routerGuard.hasAccessToDoOperation('LIST_DESIGNATION')) {
                    const bar =
                        {
                            id: 'list_designation',
                            title: 'Designation',
                            type: 'item',
                            icon: ['fab', 'hackerrank'],
                            url: '/designation/list',
                            // badge    : {
                            //     title    : 'Done',
                            //     bg       : '#F44336',
                            //     fg       : '#FFFFFF'
                            // }
                        };
                    hrBar.children.push(bar);
                }

                if (this.routerGuard.hasAccessToDoOperation('LIST_EMPLOYMENT_TYPE')) {
                    const bar =
                        {
                            id: 'list_employment_type',
                            title: 'Employment Type',
                            type: 'item',
                            icon: ['fas', 'clipboard-list'],
                            url: '/employment_type/list',
                            // badge    : {
                            //     title    : 'Done',
                            //     bg       : '#F44336',
                            //     fg       : '#FFFFFF'
                            // }
                        };
                    hrBar.children.push(bar);
                }

                if (this.routerGuard.hasAccessToDoOperation('LIST_EMPLOYEE')) {
                    const bar =
                        {
                            id: 'list_employee',
                            title: 'Employee',
                            type: 'item',
                            icon : ['fas', 'user-tie'],
                            url: '/employee/list',
                            // badge    : {
                            //     title    : 'Done',
                            //     bg       : '#F44336',
                            //     fg       : '#FFFFFF'
                            // }
                        };
                    hrBar.children.push(bar);
                }

                navigationBar.push(hrBar);
            }


            // Admission Push
            if (this.routerGuard.hasAccessToDoOperation('LIST_STUDENT')) {

                const admissionBar =
                    {
                        id: 'admission',
                        title: 'Admission',
                        type: 'group',
                        children : []
                    };

                if (this.routerGuard.hasAccessToDoOperation('LIST_STUDENT')) {
                    const bar =
                        {
                            id: 'list_student',
                            title: 'Student',
                            type: 'item',
                            icon: ['fas', 'user-graduate'],
                            url: '/student/list',
                            // badge    : {
                            //     title    : 'Done',
                            //     bg       : '#F44336',
                            //     fg       : '#FFFFFF'
                            // }
                        };
                    admissionBar.children.push(bar);
                }

                navigationBar.push(admissionBar);
            }


            // Academic Push
            if (this.routerGuard.hasAccessToDoOperation('LIST_DEGREE_OFFERED') || this.routerGuard.hasAccessToDoOperation('LIST_ACADEMIC_PROGRAM')
                || this.routerGuard.hasAccessToDoOperation('LIST_SEMESTER')) {

                const academicBar =
                    {
                        id: 'academic',
                        title: 'Academic',
                        type: 'group',
                        children : []
                    };

                if (this.routerGuard.hasAccessToDoOperation('LIST_DEGREE_OFFERED')) {
                    const bar =
                        {
                            id: 'list_degree_offered',
                            title: 'Degree Offered',
                            type: 'item',
                            icon: ['fas', 'graduation-cap'],
                            url: '/degree_offered/list',
                            // badge    : {
                            //     title    : 'Done',
                            //     bg       : '#F44336',
                            //     fg       : '#FFFFFF'
                            // }
                        };
                    academicBar.children.push(bar);
                }

                if (this.routerGuard.hasAccessToDoOperation('LIST_ACADEMIC_PROGRAM')) {
                    const bar =
                        {
                            id: 'list_academic_program',
                            title: 'Academic Program',
                            type: 'item',
                            icon: ['fas', 'pen-alt'],
                            url: '/academic_program/list',
                            // badge    : {
                            //     title    : 'Done',
                            //     bg       : '#F44336',
                            //     fg       : '#FFFFFF'
                            // }
                        };
                    academicBar.children.push(bar);
                }

                if (this.routerGuard.hasAccessToDoOperation('LIST_SEMESTER')) {
                    const bar =
                        {
                            id: 'list_semester',
                            title: 'Semester',
                            type: 'item',
                            icon: 'linear_scale',
                            url: '/semester/list',
                            // badge    : {
                            //     title    : 'Done',
                            //     bg       : '#F44336',
                            //     fg       : '#FFFFFF'
                            // }
                        };
                    academicBar.children.push(bar);
                }

                navigationBar.push(academicBar);
            }


            // Administrative Push
            if (user.username === 'admin' && (this.routerGuard.hasAccessToDoOperation('LIST_RANK') || this.routerGuard.hasAccessToDoOperation('LIST_OCCUPATION')
                || this.routerGuard.hasAccessToDoOperation('LIST_RELIGION') || this.routerGuard.hasAccessToDoOperation('LIST_SKILL')
                || this.routerGuard.hasAccessToDoOperation('LIST_LANGUAGE') || this.routerGuard.hasAccessToDoOperation('LIST_DEGREE_CONCENTRATION')
                || this.routerGuard.hasAccessToDoOperation('LIST_COUNTRY') || this.routerGuard.hasAccessToDoOperation('LIST_EDUCATIONAL_INSTITUTE')
                || this.routerGuard.hasAccessToDoOperation('LIST_STANDARDIZED_TEST'))) {

                const administrativeBar =
                    {
                        id: 'administrative',
                        title: 'Administrative',
                        type: 'group',
                        children : []
                    };

                if (this.routerGuard.hasAccessToDoOperation('LIST_OCCUPATION')) {
                    const bar =
                        {
                            id: 'list_occupation',
                            title: 'Occupation',
                            type: 'item',
                            icon: ['fas', 'user-md'],
                            url: '/occupation/list',
                            // badge    : {
                            //     title    : 'Done',
                            //     bg       : '#F44336',
                            //     fg       : '#FFFFFF'
                            // }
                        };
                    administrativeBar.children.push(bar);
                }

                if (this.routerGuard.hasAccessToDoOperation('LIST_RELIGION')) {
                    const bar =
                        {
                            id: 'list_religion',
                            title: 'Religion',
                            type: 'item',
                            icon: ['fas', 'mosque'],
                            url: '/religion/list',
                            // badge    : {
                            //     title    : 'Done',
                            //     bg       : '#F44336',
                            //     fg       : '#FFFFFF'
                            // }
                        };
                    administrativeBar.children.push(bar);
                }

                if (this.routerGuard.hasAccessToDoOperation('LIST_SKILL')) {
                    const bar =
                        {
                            id: 'list_skill',
                            title: 'Skill',
                            type: 'item',
                            icon: ['fas', 'paint-brush'],
                            url: '/skill/list',
                            // badge    : {
                            //     title    : 'Done',
                            //     bg       : '#F44336',
                            //     fg       : '#FFFFFF'
                            // }
                        };
                    administrativeBar.children.push(bar);
                }

                if (this.routerGuard.hasAccessToDoOperation('LIST_LANGUAGE')) {
                    const bar =
                        {
                            id: 'list_language',
                            title: 'Language',
                            type: 'item',
                            icon: ['fas', 'language'],
                            url: '/language/list',
                            // badge    : {
                            //     title    : 'Done',
                            //     bg       : '#F44336',
                            //     fg       : '#FFFFFF'
                            // }
                        };
                    administrativeBar.children.push(bar);
                }

                if (this.routerGuard.hasAccessToDoOperation('LIST_DEGREE_CONCENTRATION')) {
                    const bar =
                        {
                            id: 'list_degree_concentration',
                            title: 'Degree Concentration',
                            type: 'item',
                            icon: ['fas', 'pen-fancy'],
                            url: '/degree_concentration/list',
                            // badge    : {
                            //     title    : 'Done',
                            //     bg       : '#F44336',
                            //     fg       : '#FFFFFF'
                            // }
                        };
                    administrativeBar.children.push(bar);
                }

                if (this.routerGuard.hasAccessToDoOperation('LIST_COUNTRY')) {
                    const bar =
                        {
                            id: 'list_country',
                            title: 'Country',
                            type: 'item',
                            icon: ['fas', 'globe-asia'],
                            url: '/country/list',
                            // badge    : {
                            //     title    : 'Done',
                            //     bg       : '#F44336',
                            //     fg       : '#FFFFFF'
                            // }
                        };
                    administrativeBar.children.push(bar);
                }

                if (this.routerGuard.hasAccessToDoOperation('LIST_EDUCATIONAL_INSTITUTE')) {
                    const bar =
                        {
                            id: 'list_educational_institute',
                            title: 'Educational Institute',
                            type: 'item',
                            icon: ['fas', 'university'],
                            url: '/educational_institute/list',
                            // badge    : {
                            //     title    : 'Done',
                            //     bg       : '#F44336',
                            //     fg       : '#FFFFFF'
                            // }
                        };
                    administrativeBar.children.push(bar);
                }

                if (this.routerGuard.hasAccessToDoOperation('LIST_STANDARDIZED_TEST')) {
                    const bar =
                        {
                            id: 'list_standardized_test',
                            title: 'Standardized Test',
                            type: 'item',
                            icon: ['fas', 'sort-numeric-up'],
                            url: '/standardized_test/list',
                            // badge    : {
                            //     title    : 'Done',
                            //     bg       : '#F44336',
                            //     fg       : '#FFFFFF'
                            // }
                        };
                    administrativeBar.children.push(bar);
                }
                navigationBar.push(administrativeBar);
            }

            /**
             * Report Bar for all the reports
             */
            const reportBar =
                {
                    id: 'report_service',
                    title: 'REPORT',
                    type: 'group',
                    children : []
                };

            const comparisonReport =
                {
                    id: 'male_female_report',
                    title: 'Male-Female Report',
                    type: 'item',
                    icon: ['fas', 'sort-numeric-down'],
                    url: '/report/student/male-female',
                    // url: 'standardized_test/list',
                    // badge    : {
                    //     title    : 'Done',
                    //     bg       : '#F44336',
                    //     fg       : '#FFFFFF'
                    // }
                };
            reportBar.children.push(comparisonReport);

            const dailyReport =
                {
                    id: 'daily_report',
                    title: 'Daily Report',
                    type: 'item',
                    icon: ['fas', 'sort-numeric-down'],
                    url: '/report/student/daily-report',
                    // url: 'standardized_test/list',
                    // badge    : {
                    //     title    : 'Done',
                    //     bg       : '#F44336',
                    //     fg       : '#FFFFFF'
                    // }
                };
            reportBar.children.push(dailyReport);

            navigationBar.push(reportBar);

        }
        // console.log(navigationBar);

        // Register the new navigation
        // this._fuseNavigationService.register('user-nav', navigationBar);

        // Set the current navigation
        // this._fuseNavigationService.setCurrentNavigation('user-nav');

        localStorage.setItem('navigationBar', JSON.stringify(navigationBar));
        // ========>>>>>>>>>> NAVIGATION GENERATE END
    }

    private setAuthorization(accessTokenData: any): void {
        // console.log(accessTokenData);
        const authorizationListObject: number[] = accessTokenData.authorization;
        const authorizedOperationList: string[] = new Array();
        for (let i = 0; i < authorizationListObject.length; i++) {
            if (authorizationListObject[i] < 0) {
                return;
            }
            let authorizedBitString = authorizationListObject[i].toString(2);
            while (authorizedBitString.length < 64) {
                authorizedBitString = '0' + authorizedBitString;
            }

            const serviceBitIndex = parseInt(authorizedBitString.slice(-10), 2);
            const service: Service = this.serviceList[serviceBitIndex];

            const operationBitIndexString = authorizedBitString.substring(0, 54);

            // console.log(authorizedBitString + ' - ' + operationBitIndexString + ' - ' + serviceBitIndex + ' - ' + service.id);


            for (let j = 0; j < service.operationList.length; j++) {
                const operationBit = operationBitIndexString.charAt(53 - j);
                if (operationBit === '1') {
                    authorizedOperationList.push(service.operationList[j].id);
                }
            }

            // console.log(authorizedBitString + ' -- ' + operationBitIndexString + ' - ' + service.id);
        }

        // console.log(authorizedOperationList);
        // console.log(this.serviceList);
        // console.log(this.operationList);
        // console.log(this.serviceWithControllerList);

        localStorage.setItem('authorizedOperationList', JSON.stringify(authorizedOperationList));
    }

    private showSnackBar(message: string, action: string, duration: number): void {
        this._snackBar.open(message, action, {
            politeness: 'polite',
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: duration,
        });
    }

    private getEmployeeDetailsByUsername(user: User, accessTokenData: any): any {
        this._fuseProgressBarService.show();
        this._employeeService.getEmployeeDetailsByUsername(user.username).map((data) => {
            this.employee = data.body;
            this.user.name = this.employee.name;

            localStorage.setItem('employee', JSON.stringify(this.employee));
            localStorage.setItem('user', JSON.stringify(this.user));

            this.setSampleNavBar(user);
            this.redirectToDashboard();

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

    private getOperationList(): any {
        this._fuseProgressBarService.show();
        this._enumService.getOperationList().map((data) => {

            this.operationList = data.body;

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

    private getServiceList(): any {
        this._fuseProgressBarService.show();
        this._enumService.getServiceList().map((data) => {

            this.serviceList = data.body;

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

}
