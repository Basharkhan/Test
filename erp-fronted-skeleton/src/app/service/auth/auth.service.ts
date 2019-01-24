import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {ApiService} from '../api.service';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    // API Configuration Start
    private _protocol = 'http';	// http or https
    private _host = 'localhost';	// localhost or IP or Domain
    private _port = '8080';		// Port 8080 or 8090 or etc
    private _service_name = 'auth';		// Service Name like auth or hr or student
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

    public _refresh_token_url = this._auth_api_url + '/refresh_token';
    public _login_url = this._auth_api_url + '/login';
    public _logout_url = this._auth_api_url + '/logout';
    public _change_password_url = this._auth_api_url + '/change_password';
    public _whoami_url = this._auth_api_url + '/whoami';
    public _user_url = this._auth_api_url + '/user';
    public _users_url = this._user_url + '/all';
    public _reset_credentials_url = this._user_url + '/reset_credentials';
    public _change_allowed_ip_url = this._auth_api_url + '/change_allowed_ip';
    public _test_url = this._auth_api_url + '/test';
    public _signup_url = this._auth_api_url + '/signup';

    // API Configuration END


    private _httpHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true',
    });

    constructor(
        private _apiService: ApiService
    ) {
    }

    login(username, password): Observable<any> {
        const body = `username=${username}&password=${password}`;
        return this._apiService.post(this._login_url, body, this._httpHeaders);

        // return this._apiService.post(this.authConfig._login_url, body, this._httpHeaders).map(() => {
        // 	// console.log("Login success");
        // 	// this.userService.getMyInfo().subscribe();
        // }).subscribe(
        // 	(data) => {
        // 		return true;
        // 		// console.log(" HURRAY NO ERROR " + JSON.stringify(data))
        // 	},
        // 	(err) => {
        // 		return false;
        // 		// console.log("GOT AN ERROR " + JSON.stringify(err))
        // 	});

    }

    signup(user): Observable<any> {
        return this._apiService.post(this._signup_url, JSON.stringify(user), this._httpHeaders).map(() => {
            console.log('Sign up success');
        });
    }

    logout(): Observable<any> {
        return this._apiService.post(this._logout_url, {}, this._httpHeaders);
    }

    changePassowrd(passwordChanger): Observable<any> {
        return this._apiService.post(this._change_password_url, passwordChanger);
    }

    changeAllowedIp(allowedIp: string): Observable<any> {
        return this._apiService.get(this._change_allowed_ip_url + '/' + allowedIp);
    }

}
