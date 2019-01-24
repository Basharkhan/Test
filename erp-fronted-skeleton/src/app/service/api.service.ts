import {HttpClient, HttpHeaders, HttpResponse, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/throw';
import {RequestMethod} from '../model/other/request-method';
import {serialize} from '../utilities/serialize';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    headers = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Expose-Headers': '*',
    });

    constructor(private http: HttpClient) {
    }

    get(path: string, args?: any): Observable<any> {
        const options = {
            headers: this.headers,
            withCredentials: true
        };

        if (args) {
            options['params'] = serialize(args);
            options['observe'] = 'response';
        }

        return this.http.get(path, options)
            .catch(this.checkError.bind(this));
    }

    post(path: string, body: any, customHeaders?: HttpHeaders): Observable<any> {
        return this.request(path, body, RequestMethod.Post, customHeaders);
    }

    put(path: string, body: any, customHeaders?: HttpHeaders): Observable<any> {
        return this.request(path, body, RequestMethod.Put, customHeaders);
    }

    delete(path: string, body?: any): Observable<any> {
        return this.request(path, body, RequestMethod.Delete);
    }

    upload(path: string, body: any, file: File, customHeaders?: HttpHeaders): Observable<any> {
        const formdata: FormData = new FormData();
        formdata.append('file', file);

        const req = new HttpRequest('POST', path, formdata, {
            headers: customHeaders || this.headers,
            reportProgress: true,
            responseType: 'text'
        });

        return this.http.request(req);
    }

    private request(path: string, body: any, method = RequestMethod.Post, customHeaders?: HttpHeaders): Observable<any> {
        const req = new HttpRequest(method, path, body, {
            headers: customHeaders || this.headers,
            withCredentials: true
        });

        return this.http.request(req)
            .filter(response => response instanceof HttpResponse)
            .map((response: HttpResponse<any>) => response.body)
            .catch(error => this.checkError(error));
    }

    // Display error if logged in, otherwise redirect to IDP
    private checkError(error: any): any {
        if (error && error.status === 401) {
            // this.redirectIfUnauth(error);
        } else {
            // this.displayError(error);
        }
        throw error;
    }
}
