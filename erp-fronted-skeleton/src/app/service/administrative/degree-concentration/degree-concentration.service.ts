import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {ApiService} from '../../api.service';
import {Observable} from 'rxjs';
import {DegreeConcentration} from '../../../model/person-information/educational-information/degree-concentration.model';

@Injectable({
    providedIn: 'root'
})
export class DegreeConcentrationService {

    // API Configuration Start
    private _protocol = 'http';	// http or https
    private _host = 'localhost';	// localhost or IP or Domain
    private _port = '8081';		// Port 8080 or 8090 or etc
    private _service_name = 'degree_concentration';		// Service Name like auth or hr or student
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

    public _degree_Concentration_list = this._auth_api_url + '/list';
    public _degree_Concentration_filtered_name_list = this._auth_api_url + '/list/name';
    public _degree_Concentration_details = this._auth_api_url + '/view';
    public _create_degree_Concentration = this._auth_api_url + '/create';
    public _update_degree_Concentration = this._auth_api_url + '/update';
    public _delete_degree_Concentration = this._auth_api_url + '/delete';

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

    getDegreeConcentration(pageNumber: number = 0, pageSize: number = 10, sort: string = 'name:asc'): Observable<any> {
        return this._apiService.get(this._degree_Concentration_list + '?pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&sort=' + sort, this._httpHeaders);
    }

    getDegreeConcentrationListByName(name: string = 'DegreeConcentration', pageNumber: number = 0, pageSize: number = 10, sort: string = 'name:asc'): Observable<any> {
        if (name === '') {
            name = 'DegreeConcentration';
        }
        return this._apiService
            .get(this._degree_Concentration_filtered_name_list + '/' + name + '?pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&sort=' + sort, this._httpHeaders);
    }

    getDegreeConcentrationDetails(id: string): Observable<any> {
        return this._apiService.get(this._degree_Concentration_details + '/' + id, this._httpHeaders);
    }

    createDegreeConcentration(degreeConcentration: DegreeConcentration): Observable<any> {
        return this._apiService.post(this._create_degree_Concentration, degreeConcentration, this._httpHeaders);
    }

    updateDegreeConcentration(degreeConcentration: DegreeConcentration): Observable<any> {
        return this._apiService.put(this._update_degree_Concentration + '/' + degreeConcentration.id, degreeConcentration, this._httpHeaders);
    }
}
