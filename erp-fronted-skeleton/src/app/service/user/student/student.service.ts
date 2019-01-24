import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {ApiService} from '../../api.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Student} from '../../../model/student-information/student.model';

@Injectable({
    providedIn: 'root'
})
export class StudentService {

    // API Configuration Start
    private _protocol = 'http';	// http or https
    private _host = 'localhost';	// localhost or IP or Domain
    private _port = '8081';		// Port 8080 or 8090 or etc
    private _service_name = 'student';		// Service Name like auth or hr or student
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


    // Report API
    public _student_report = '/report' + this._auth_api_url;
    public _student_report_get_listed_object = this._student_report + '/get_object_as_list';
    public _student_report_academic_program_list = this._student_report + '/academic_program_list';
    public _student_report_office_list = this._student_report + '/office_list';
    public _student_report_office_list_from_school = this._student_report + '/office_from_school';
    public _student_report_daily_admission = this._student_report + '/daily_admission';

    //

    public _student_list = this._auth_api_url + '/list';
    public _student_filtered_name_list = this._auth_api_url + '/list/name';
    public _student_filtered_academic_program_id_list = this._auth_api_url + '/list/academic_program';
    public _student_filtered_student_id_list = this._auth_api_url + '/list/id';
    public _student_details = this._auth_api_url + '/view';
    public _create_student = this._auth_api_url + '/create';
    // public _update_student = this._auth_api_url + '/update';
    public _update_student_basic_information = this._auth_api_url + '/update/basic_information';
    public _update_student_parents = this._auth_api_url + '/update/parents';
    public _update_student_contact = this._auth_api_url + '/update/contact';
    public _update_student_address = this._auth_api_url + '/update/address';
    public _update_student_educational_information = this._auth_api_url + '/update/educational_information';
    public _update_student_publication = this._auth_api_url + '/update/publication';
    public _update_student_experience = this._auth_api_url + '/update/experience';
    public _update_student_standardized_test = this._auth_api_url + '/update/standardized_test';
    public _update_student_training = this._auth_api_url + '/update/training';
    public _update_student_qualification = this._auth_api_url + '/update/qualification';
    public _update_student_spouse = this._auth_api_url + '/update/spouse';
    public _update_student_child = this._auth_api_url + '/update/child';
    public _update_student_emergency_person = this._auth_api_url + '/update/emergency_person';
    public _update_student_reference = this._auth_api_url + '/update/reference';
    public _update_student_language = this._auth_api_url + '/update/language';
    public _update_student_specialization = this._auth_api_url + '/update/specialization';
    public _update_student_profile_link = this._auth_api_url + '/update/profile_link';
    public _update_student_picture = this._auth_api_url + '/update/picture';
    public _update_student_file_upload = this._auth_api_url + '/update/file_upload';
    public _update_student_employment_information = this._auth_api_url + '/update/employment_information';
    public _update_student_designation = this._auth_api_url + '/update/designation';
    public _update_student_nominee = this._auth_api_url + '/update/nominee';
    public _delete_student = this._auth_api_url + '/delete';

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

    getStudent(pageNumber: number = 0, pageSize: number = 10, sort: string = 'name:asc'): Observable<any> {
        return this._apiService.get(this._student_list + '?pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&sort=' + sort, this._httpHeaders);
    }

    getStudentListByName(name: string, pageNumber: number = 0, pageSize: number = 10, sort: string = 'name:asc'): Observable<any> {
        if (name === '' || name == null) {
            name = 'a';
        }
        return this._apiService.get(this._student_filtered_name_list + '/' + name + '?pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&sort=' + sort, this._httpHeaders);
    }

    getStudentListByAcademicProgram(academicProgramId: number, pageNumber: number = 0, pageSize: number = 10, sort: string = 'id:desc'): Observable<any> {
        if (academicProgramId == null || academicProgramId === 0) {
            academicProgramId = 1;
        }
        return this._apiService.get(this._student_filtered_academic_program_id_list +
            '/' + academicProgramId + '?pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&sort=' + sort, this._httpHeaders);
    }

    getStudentListByStudentId(studentId: string, pageNumber: number = 0, pageSize: number = 10, sort: string = 'id:desc'): Observable<any> {
        if (studentId == null || studentId === '') {
            studentId = '2019';
        }
        return this._apiService.get(this._student_filtered_student_id_list +
            '/' + studentId + '?pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&sort=' + sort, this._httpHeaders);
    }

    getStudentDetails(id: string): Observable<any> {
        return this._apiService.get(this._student_details + '/' + id, this._httpHeaders);
    }

    createStudent(student: Student): Observable<any> {
        return this._apiService.post(this._create_student, student, this._httpHeaders);
    }
/*
    updateStudent(student: Student): Observable<any> {
        return this._apiService.put(this._update_student, student, this._httpHeaders);
    }
*/
    updateStudentBasicInformation(student: Student): Observable<any> {
        return this._apiService.put(this._update_student_basic_information, student, this._httpHeaders);
    }

    updateStudentParents(student: Student): Observable<any> {
        return this._apiService.put(this._update_student_parents, student, this._httpHeaders);
    }

    updateStudentContact(student: Student): Observable<any> {
        return this._apiService.put(this._update_student_contact, student, this._httpHeaders);
    }

    updateStudentAddress(student: Student): Observable<any> {
        return this._apiService.put(this._update_student_address, student, this._httpHeaders);
    }

    updateStudentEducationalInformation(student: Student): Observable<any> {
        return this._apiService.put(this._update_student_educational_information, student, this._httpHeaders);
    }

    updateStudentPublication(student: Student): Observable<any> {
        return this._apiService.put(this._update_student_publication, student, this._httpHeaders);
    }

    updateStudentExperience(student: Student): Observable<any> {
        return this._apiService.put(this._update_student_experience, student, this._httpHeaders);
    }

    updateStudentStandardizedTest(student: Student): Observable<any> {
        return this._apiService.put(this._update_student_standardized_test, student, this._httpHeaders);
    }

    updateStudentTraining(student: Student): Observable<any> {
        return this._apiService.put(this._update_student_training, student, this._httpHeaders);
    }

    updateStudentQualification(student: Student): Observable<any> {
        return this._apiService.put(this._update_student_qualification, student, this._httpHeaders);
    }

    updateStudentSpouse(student: Student): Observable<any> {
        return this._apiService.put(this._update_student_spouse, student, this._httpHeaders);
    }

    updateStudentChild(student: Student): Observable<any> {
        return this._apiService.put(this._update_student_child, student, this._httpHeaders);
    }

    updateStudentEmergencyPerson(student: Student): Observable<any> {
        return this._apiService.put(this._update_student_emergency_person, student, this._httpHeaders);
    }

    updateStudentReference(student: Student): Observable<any> {
        return this._apiService.put(this._update_student_reference, student, this._httpHeaders);
    }

    updateStudentLanguage(student: Student): Observable<any> {
        return this._apiService.put(this._update_student_language, student, this._httpHeaders);
    }

    updateStudentSpecialization(student: Student): Observable<any> {
        return this._apiService.put(this._update_student_specialization, student, this._httpHeaders);
    }

    updateStudentProfileLink(student: Student): Observable<any> {
        return this._apiService.put(this._update_student_profile_link, student, this._httpHeaders);
    }

    updateStudentProfilePicture(student: Student): Observable<any> {
        return this._apiService.put(this._update_student_picture, student, this._httpHeaders);
    }

    updateStudentFileUpload(student: Student): Observable<any> {
        return this._apiService.put(this._update_student_file_upload, student, this._httpHeaders);
    }

    /**
     * Service for reports
     */
    getParameteredMaleFemaleStudentCount(): Observable<any> {
        console.log(this._student_report_academic_program_list + '/');
        return this._apiService.get(this._student_report_academic_program_list + '/', this._httpHeaders);
    }

    getOfficeList(): any {
        console.log(this._student_report_office_list + '/');
        return this._apiService.get(this._student_report_office_list + '/', this._httpHeaders);
    }

    getOfficeListFromSchool(schoolName: string): any {
        console.log(this._student_report_office_list_from_school + '/' + schoolName);
        return this._apiService.get(this._student_report_office_list_from_school + '/' + schoolName, this._httpHeaders);
    }
    getObjectList(officeName: string): any {
        return this._apiService.get(this._student_report_get_listed_object + '/' + officeName, this._httpHeaders);
    }

    getDailyAdmissionReport(officeName: string): any {
        return this._apiService.get(this._student_report_daily_admission + '/' + officeName, this._httpHeaders);
    }

//


}
