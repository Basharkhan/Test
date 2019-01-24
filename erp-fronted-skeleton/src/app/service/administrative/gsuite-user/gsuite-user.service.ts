import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {ApiService} from '../../api.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {GSuiteUser} from '../../../model/auth/gsuite-user.model';

@Injectable({
    providedIn: 'root'
})
export class GSuiteUserService {

    // API Configuration Start
    private _protocol = 'http';	// http or https
    private _host = 'localhost';	// localhost or IP or Domain
    private _port = '8081';		// Port 8080 or 8090 or etc
    private _service_name = 'gsuite_user';		// Service Name like auth or hr or student
    private _api_path = 'api';		// Path of the API

    private _version_path = 'v';
    private _version_major = 0;
    private _version_minor = 0;
    private _version_patch = 1;

    // private _auth_api_url = this._protocol + '://' + this._host + ':' + this._port + '/' + this._service_name + '/' +
    // this._api_path + '/' + this._version_path + '/' + this._version_major + '.' + this._version_minor + '.' + this._version_patch;
    private _gsuite_user_api_proxy_config = '/' + this._service_name;
    private _gsuite_user_api_url = this._gsuite_user_api_proxy_config + '/' + this._api_path + '/' + this._version_path + '/' +
        this._version_major + '.' + this._version_minor + '.' + this._version_patch;

    public _gsuite_user_list = this._gsuite_user_api_url + '/list';
    public _gsuite_user_details = this._gsuite_user_api_url + '/view';
    public _gsuite_user_create = this._gsuite_user_api_url + '/create';
    public _gsuite_user_activate = this._gsuite_user_api_url + '/activate';

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

    getGsuiteUser(pageNumber: number = 0, pageSize: number = 10, sort: string = 'name:asc'): Observable<any> {
        return this._apiService.get(this._gsuite_user_list + '?pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&sort=' + sort, this._httpHeaders);
    }

    getGsuiteUserDetails(id: string): Observable<any> {
        return this._apiService.get(this._gsuite_user_details + '/' + id, this._httpHeaders);
    }

    createGSuiteUser(gSuiteUser: GSuiteUser): Observable<any> {
        return this._apiService.post(this._gsuite_user_create, gSuiteUser, this._httpHeaders);
    }

    activateGSuiteUser(gSuiteUser: GSuiteUser): Observable<any> {
        return this._apiService.put(this._gsuite_user_activate, gSuiteUser, this._httpHeaders);
    }
}
