import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {ApiService} from '../../api.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EnumService {

    // API Configuration Start
    private _protocol = 'http';	// http or https
    private _host = 'localhost';	// localhost or IP or Domain
    private _port = '8081';		// Port 8080 or 8090 or etc
    private _service_name = 'enum';		// Service Name like auth or hr or student
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

    public _user_role_list = this._auth_api_url + '/user_role';
    public _address_type_list = this._auth_api_url + '/address_type';
    public _email_type_list = this._auth_api_url + '/email_type';
    public _phone_type_list = this._auth_api_url + '/phone_type';
    public _gender_type_list = this._auth_api_url + '/gender_type';
    public _education_level_type_list = this._auth_api_url + '/education_level_type';
    public _education_level_list = this._auth_api_url + '/education_level';
    public _degree_result_type_list = this._auth_api_url + '/degree_result_type';
    public _publication_type_list = this._auth_api_url + '/publication_type';
    public _author_type_list = this._auth_api_url + '/author_type';
    public _service_list = this._auth_api_url + '/service';
    public _operation_list = this._auth_api_url + '/operation';
    public _defaulter_type_list = this._auth_api_url + '/defaulter_type';

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

    getUserRoleList(): Observable<any> {
        return this._apiService.get(this._user_role_list + '', this._httpHeaders);
    }

    getAddressTypeList(): Observable<any> {
        return this._apiService.get(this._address_type_list + '', this._httpHeaders);
    }

    getEmailTypeList(): Observable<any> {
        return this._apiService.get(this._email_type_list + '', this._httpHeaders);
    }

    getPhoneTypeList(): Observable<any> {
        return this._apiService.get(this._phone_type_list + '', this._httpHeaders);
    }

    getGenderTypeList(): Observable<any> {
        return this._apiService.get(this._gender_type_list + '', this._httpHeaders);
    }

    getEducationLevelTypeList(): Observable<any> {
        return this._apiService.get(this._education_level_type_list + '', this._httpHeaders);
    }

    getEducationLevelList(): Observable<any> {
        return this._apiService.get(this._education_level_list + '', this._httpHeaders);
    }

    getDegreeResultList(): Observable<any> {
        return this._apiService.get(this._degree_result_type_list + '', this._httpHeaders);
    }

    getPublicationTypeList(): Observable<any> {
        return this._apiService.get(this._publication_type_list + '', this._httpHeaders);
    }

    getAuthorTypeList(): Observable<any> {
        return this._apiService.get(this._author_type_list + '', this._httpHeaders);
    }

    getServiceList(): Observable<any> {
        return this._apiService.get(this._service_list + '', this._httpHeaders);
    }

    getOperationList(): Observable<any> {
        return this._apiService.get(this._operation_list + '', this._httpHeaders);
    }

    getDefaulterTypeList(): Observable<any> {
        return this._apiService.get(this._defaulter_type_list + '', this._httpHeaders);
    }
}
