import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {ApiService} from '../../api.service';
import {Observable} from 'rxjs';
import {Employee} from '../../../model/employee-information/employee.model';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {


    public static PASSWORD_FILE_API_URL = 'http://localhost:4200/employee/api/v/0.0.1/password/';

    // API Configuration Start
    private _protocol = 'http';	// http or https
    private _host = 'localhost';	// localhost or IP or Domain
    private _port = '8081';		// Port 8080 or 8090 or etc
    private _service_name = 'employee';		// Service Name like auth or hr or student
    private _api_path = 'api';		// Path of the API

    private _version_path = 'v';
    private _version_major = 0;
    private _version_minor = 0;
    private _version_patch = 1;

    // private _auth_api_url = this._protocol + '://' + this._host + ':' + this._port + '/' + this._service_name + '/' +
    // this._api_path + '/' + this._version_path + '/' + this._version_major + '.' + this._version_minor + '.' + this._version_patch;
    private _auth_api_proxy_config = '/' + this._service_name;
    private _auth_api_url = this._auth_api_proxy_config + '/' + this._api_path + '/' + this._version_path + '/' +
        this._version_major + '.' + this._version_minor + '.' + this._version_patch;

    public _employee_list = this._auth_api_url + '/list';
    public _employee_filtered_name_list = this._auth_api_url + '/list/name';
    public _employee_details = this._auth_api_url + '/view';
    public _employee_my_details = this._auth_api_url + '/my_details';
    public _create_employee = this._auth_api_url + '/create';
    // public _update_employee = this._auth_api_url + '/update';
    public _update_employee_basic_information = this._auth_api_url + '/update/basic_information';
    public _update_employee_parents = this._auth_api_url + '/update/parents';
    public _update_employee_contact = this._auth_api_url + '/update/contact';
    public _update_employee_address = this._auth_api_url + '/update/address';
    public _update_employee_educational_information = this._auth_api_url + '/update/educational_information';
    public _update_employee_publication = this._auth_api_url + '/update/publication';
    public _update_employee_experience = this._auth_api_url + '/update/experience';
    public _update_employee_standardized_test = this._auth_api_url + '/update/standardized_test';
    public _update_employee_training = this._auth_api_url + '/update/training';
    public _update_employee_qualification = this._auth_api_url + '/update/qualification';
    public _update_employee_spouse = this._auth_api_url + '/update/spouse';
    public _update_employee_child = this._auth_api_url + '/update/child';
    public _update_employee_emergency_person = this._auth_api_url + '/update/emergency_person';
    public _update_employee_reference = this._auth_api_url + '/update/reference';
    public _update_employee_language = this._auth_api_url + '/update/language';
    public _update_employee_specialization = this._auth_api_url + '/update/specialization';
    public _update_employee_profile_link = this._auth_api_url + '/update/profile_link';
    public _update_employee_picture = this._auth_api_url + '/update/picture';
    public _update_employee_file_upload = this._auth_api_url + '/update/file_upload';
    public _update_employee_employment_information = this._auth_api_url + '/update/employment_information';
    public _update_employee_designation = this._auth_api_url + '/update/designation';
    public _update_employee_nominee = this._auth_api_url + '/update/nominee';
    public _delete_employee = this._auth_api_url + '/delete';
    public _employee_details_by_username = this._auth_api_url + '/view/by_username/';


    // API Configuration END


    private _httpHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Expose-Headers': '*'
    });


    constructor(
        private _apiService: ApiService
    ) {
    }

    getEmployee(pageNumber: number = 0, pageSize: number = 10, sort: string = 'name:asc'): Observable<any> {
        return this._apiService.get(this._employee_list + '?pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&sort=' + sort, this._httpHeaders);
    }

    getEmployeeListByName(name: string, pageNumber: number = 0, pageSize: number = 10, sort: string = 'name:asc'): Observable<any> {
        if (name === '' || name == null) {
            name = 'a';
        }
        return this._apiService.get(this._employee_filtered_name_list + '/' + name + '?pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&sort=' + sort, this._httpHeaders);
    }

    getEmployeeDetails(id: string): Observable<any> {
        return this._apiService.get(this._employee_details + '/' + id, this._httpHeaders);
    }

    getEmployeeDetailsByUsername(username: string): Observable<any> {
        return this._apiService.get(this._employee_details_by_username + '/' + username, this._httpHeaders);
    }

    createEmployee(employee: Employee): Observable<any> {
        return this._apiService.post(this._create_employee, employee, this._httpHeaders);
    }

    /*updateEmployee(employee: Employee): Observable<any> {
        return this._apiService.put(this._update_employee, employee, this._httpHeaders);
    }*/

    getEmployeeMyDetails(): Observable<any> {
        return this._apiService.get(this._employee_my_details, this._httpHeaders);
    }

    updateEmployeeBasicInformation(employee: Employee): Observable<any> {
        return this._apiService.put(this._update_employee_basic_information, employee, this._httpHeaders);
    }

    updateEmployeeParents(employee: Employee): Observable<any> {
        return this._apiService.put(this._update_employee_parents, employee, this._httpHeaders);
    }

    updateEmployeeContact(employee: Employee): Observable<any> {
        return this._apiService.put(this._update_employee_contact, employee, this._httpHeaders);
    }

    updateEmployeeAddress(employee: Employee): Observable<any> {
        return this._apiService.put(this._update_employee_address, employee, this._httpHeaders);
    }

    updateEmployeeEducationalInformation(employee: Employee): Observable<any> {
        return this._apiService.put(this._update_employee_educational_information, employee, this._httpHeaders);
    }

    updateEmployeePublication(employee: Employee): Observable<any> {
        return this._apiService.put(this._update_employee_publication, employee, this._httpHeaders);
    }

    updateEmployeeExperience(employee: Employee): Observable<any> {
        return this._apiService.put(this._update_employee_experience, employee, this._httpHeaders);
    }

    updateEmployeeStandardizedTest(employee: Employee): Observable<any> {
        return this._apiService.put(this._update_employee_standardized_test, employee, this._httpHeaders);
    }

    updateEmployeeTraining(employee: Employee): Observable<any> {
        return this._apiService.put(this._update_employee_training, employee, this._httpHeaders);
    }

    updateEmployeeQualification(employee: Employee): Observable<any> {
        return this._apiService.put(this._update_employee_qualification, employee, this._httpHeaders);
    }

    updateEmployeeSpouse(employee: Employee): Observable<any> {
        return this._apiService.put(this._update_employee_spouse, employee, this._httpHeaders);
    }

    updateEmployeeChild(employee: Employee): Observable<any> {
        return this._apiService.put(this._update_employee_child, employee, this._httpHeaders);
    }

    updateEmployeeEmergencyPerson(employee: Employee): Observable<any> {
        return this._apiService.put(this._update_employee_emergency_person, employee, this._httpHeaders);
    }

    updateEmployeeReference(employee: Employee): Observable<any> {
        return this._apiService.put(this._update_employee_reference, employee, this._httpHeaders);
    }

    updateEmployeeLanguage(employee: Employee): Observable<any> {
        return this._apiService.put(this._update_employee_language, employee, this._httpHeaders);
    }

    updateEmployeeSpecialization(employee: Employee): Observable<any> {
        return this._apiService.put(this._update_employee_specialization, employee, this._httpHeaders);
    }

    updateEmployeeProfileLink(employee: Employee): Observable<any> {
        return this._apiService.put(this._update_employee_profile_link, employee, this._httpHeaders);
    }

    updateEmployeeProfilePicture(employee: Employee): Observable<any> {
        return this._apiService.put(this._update_employee_picture, employee, this._httpHeaders);
    }

    updateEmployeeFileUpload(employee: Employee): Observable<any> {
        return this._apiService.put(this._update_employee_file_upload, employee, this._httpHeaders);
    }

    updateEmployeeEmploymentInformation(employee: Employee): Observable<any> {
        return this._apiService.put(this._update_employee_employment_information, employee, this._httpHeaders);
    }

    updateEmployeeDesignation(employee: Employee): Observable<any> {
        return this._apiService.put(this._update_employee_designation, employee, this._httpHeaders);
    }

    updateEmployeeNominee(employee: Employee): Observable<any> {
        return this._apiService.put(this._update_employee_nominee, employee, this._httpHeaders);
    }
}
