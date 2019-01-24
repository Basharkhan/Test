import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {ApiService} from '../../api.service';
import {Observable} from 'rxjs';
import {FileType} from '../../../model/file_server/file-type.model';

@Injectable({
  providedIn: 'root'
})
export class FileServerService {

    // API Configuration Start
    private _protocol = 'http';	// http or https
    private _host = 'localhost';	// localhost or IP or Domain
    private _port = '8084';		// Port 8080 or 8090 or etc
    private _service_name = 'file_server';		// Service Name like file_server or hr or student
    private _api_path = 'api';		// Path of the API

    private _version_path = 'v';
    private _version_major = 0;
    private _version_minor = 0;
    private _version_patch = 1;

    // private _file_server_api_url = this._protocol + '://' + this._host + ':' + this._port + '/' + this._service_name + '/' +
    // this._api_path + '/' + this._version_path + '/' + this._version_major + '.' + this._version_minor + '.' + this._version_patch;
    private _file_server_api_proxy_config = '/' + this._service_name;
    private _file_server_api_url = this._file_server_api_proxy_config + '/' + this._api_path + '/' + this._version_path + '/' +
        this._version_major + '.' + this._version_minor + '.' + this._version_patch;

    private _angular_port = '4200';		// Port 8080 or 8090 or etc
    public _file_upload = this._file_server_api_url + '/upload';
    public _file_retrieve = this._file_server_api_url + '/retrieve';


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

    uploadFile(file: File, username: string, fileType: FileType): Observable<any> {
        return this._apiService.upload(this._file_upload + '/' + username + '/' + fileType, [], file, this._httpHeaders);
    }

    getFile(fileName: string, fileType: FileType): Observable<any> {
        return this._apiService.get(this._file_retrieve + '/' + fileType + '/' + fileName, this._httpHeaders);
    }

    public static get fileServerBasePath(): any {
        return window.location.protocol + '//' + window.location.host + '/' + 'file_server/api/v/0.0.1/retrieve';
    }

}
