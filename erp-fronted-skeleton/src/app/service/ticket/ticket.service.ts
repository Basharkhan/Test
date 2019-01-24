import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {ApiService} from '../api.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Ticket} from '../../model/ticket/ticket.model';
import {TicketConversation} from '../../model/ticket/ticket-conversation.model';
import {User} from '../../model/auth/user.model';
import {TicketChecklist} from '../../model/ticket/ticket-checklist.model';

@Injectable({
    providedIn: 'root'
})
export class TicketService {

    // API Configuration Start
    private _protocol = 'http';	// http or https
    private _host = 'localhost';	// localhost or IP or Domain
    private _port = '8081';		// Port 8080 or 8090 or etc
    private _service_name = 'ticket';		// Service Name like auth or hr or student
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

    public _ticket_list = this._auth_api_url + '/list';
    public _my_ticket_list = this._auth_api_url + '/my_tickets';
    public _assigned_ticket_list = this._auth_api_url + '/assigned_tickets';
    public _ticket_details = this._auth_api_url + '/view';
    public _create_ticket = this._auth_api_url + '/create';
    public _ticket_my_reply = this._auth_api_url + '/my_reply';
    public _ticket_reply = this._auth_api_url + '/reply';
    public _add_ticket_tag = this._auth_api_url + '/add_tag';
    public _remove_ticket_tag = this._auth_api_url + '/remove_tag';
    public _update_ticket_status = this._auth_api_url + '/update_status';
    public _update_ticket_priority = this._auth_api_url + '/update_priority';
    public _update_ticket_type = this._auth_api_url + '/update_type';
    public _update_ticket_due_date = this._auth_api_url + '/update_due_date';
    public _remove_ticket_due_date = this._auth_api_url + '/remove_due_date';
    public _update_assigned_employee = this._auth_api_url + '/update_assigned_employee';
    public _add_ticket_check_item = this._auth_api_url + '/add_check_item';
    public _update_ticket_check_item = this._auth_api_url + '/update_check_item';
    public _remove_ticket_check_item = this._auth_api_url + '/remove_check_item';

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

    getTicketList(pageNumber: number = 0, pageSize: number = 10, sort: string = 'name:asc'): Observable<any> {
        return this._apiService.get(this._ticket_list + '?pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&sort=' + sort, this._httpHeaders);
    }

    getMyTicketList(username: string, pageNumber: number = 0, pageSize: number = 10, sort: string = 'name:asc'): Observable<any> {
        return this._apiService.get(this._my_ticket_list + '/' + username + '?pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&sort=' + sort, this._httpHeaders);
    }

    getAssignedTicketList(username: string, pageNumber: number = 0, pageSize: number = 10, sort: string = 'name:asc'): Observable<any> {
        return this._apiService.get(this._assigned_ticket_list + '/' + username + '?pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&sort=' + sort, this._httpHeaders);
    }

    getTicketDetails(id: string): Observable<any> {
        return this._apiService.get(this._ticket_details + '/' + id, this._httpHeaders);
    }

    createTicket(ticket: Ticket): Observable<any> {
        return this._apiService.post(this._create_ticket, ticket, this._httpHeaders);
    }

    addTicketMyConversation(username: string, id: string, ticketConversation: TicketConversation): Observable<any> {
        return this._apiService.put(this._ticket_my_reply + '/' + username + '/' + id, ticketConversation, this._httpHeaders);
    }

    addTicketConversation(id: string, ticketConversation: TicketConversation): Observable<any> {
        return this._apiService.put(this._ticket_my_reply + '/' + id, ticketConversation, this._httpHeaders);
    }

    addTicketTag(id: string, username: string, tag: string): Observable<any> {
        return this._apiService.put(this._add_ticket_tag + '/' + id + '/' + username + '/' + tag, '', this._httpHeaders);
    }

    removeTicketTag(id: string, username: string, tag: string): Observable<any> {
        return this._apiService.put(this._remove_ticket_tag + '/' + id + '/' + username + '/' + tag, '', this._httpHeaders);
    }

    updateTicketStatus(id: string, username: string, status: string): Observable<any> {
        return this._apiService.put(this._update_ticket_status + '/' + id + '/' + username + '/' + status, '', this._httpHeaders);
    }

    updateTicketPriority(id: string, username: string, priority: string): Observable<any> {
        return this._apiService.put(this._update_ticket_priority + '/' + id + '/' + username + '/' + priority, '', this._httpHeaders);
    }

    updateTicketType(id: string, username: string, type: string): Observable<any> {
        return this._apiService.put(this._update_ticket_type + '/' + id + '/' + username + '/' + type, '', this._httpHeaders);
    }

    updateTicketDueDate(id: string, username: string, dueDate: number): Observable<any> {
        return this._apiService.put(this._update_ticket_due_date + '/' + id + '/' + username + '/' + dueDate, '', this._httpHeaders);
    }

    removeTicketDueDate(id: string, username: string): Observable<any> {
        return this._apiService.put(this._remove_ticket_due_date + '/' + id + '/' + username, '', this._httpHeaders);
    }

    updateAssigneeEmployee(id: string, username: string, user: User): Observable<any> {
        return this._apiService.put(this._update_assigned_employee + '/' + id + '/' + username, user, this._httpHeaders);
    }

    addTicketChecklist(id: string, username: string, checklistname: string): Observable<any> {
        return this._apiService.put(this._add_ticket_check_item + '/' + id + '/' + username + '/' + checklistname, '', this._httpHeaders);
    }

    updateTicketChecklist(id: string, username: string, ticketChecklist: TicketChecklist): Observable<any> {
        return this._apiService.put(this._update_ticket_check_item + '/' + id + '/' + username + '/' + ticketChecklist.id, ticketChecklist, this._httpHeaders);
    }

    removeTicketChecklist(id: string, username: string, checklistid: string): Observable<any> {
        return this._apiService.put(this._remove_ticket_check_item + '/' + id + '/' + username + '/' + checklistid, '', this._httpHeaders);
    }
}
