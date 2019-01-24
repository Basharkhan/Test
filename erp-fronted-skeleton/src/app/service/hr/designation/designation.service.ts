import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {ApiService} from '../../api.service';
import {Observable} from 'rxjs';
import {Designation} from '../../../model/office-information/designation.model';

@Injectable({
    providedIn: 'root'
})
export class DesignationService {

    // API Configuration Start
    private _protocol = 'http';	// http or https
    private _host = 'localhost';	// localhost or IP or Domain
    private _port = '8082';		// Port 8080 or 8090 or etc
    private _service_name = 'designation';		// Service Name like auth or hr or student
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

    public _designation_list = this._auth_api_url + '/list';
    public _designation_details = this._auth_api_url + '/view';
    public _create_designation = this._auth_api_url + '/create';
    public _update_designation = this._auth_api_url + '/update';
    public _delete_designation = this._auth_api_url + '/delete';
    public _update_designation_authorized_operation = this._auth_api_url + '/update_authorized_operation';

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

    getDesignation(pageNumber: number = 0, pageSize: number = 10, sort: string = 'name:asc'): Observable<any> {
        return this._apiService.get(this._designation_list + '?pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&sort=' + sort, this._httpHeaders);
    }
    getDesignationDetails(id: string): Observable<any> {
        return this._apiService.get(this._designation_details + '/' + id, this._httpHeaders);
    }

    createDesignation(designation: Designation): Observable<any> {
        return this._apiService.post(this._create_designation, designation, this._httpHeaders);
    }

    updateDesignation(designation: Designation): Observable<any> {
        return this._apiService.put(this._update_designation + '/' + designation.id, designation, this._httpHeaders);
    }

    updateDesignationAuthorizedOperation(designation: Designation): Observable<any> {
        return this._apiService.put(this._update_designation_authorized_operation + '/' + designation.id, designation, this._httpHeaders);
    }
}
