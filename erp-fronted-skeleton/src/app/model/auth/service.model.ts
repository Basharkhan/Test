import {Operation} from './operation.model';

export class Service {
    public id: string;
    public name: string;
    public details: string;
    public scheme: string;
    public host: string;
    public port: string;
    public servicePath: string;
    public apiPath: string;
    public versionPath: string;
    public apiMajor: string;
    public apiMinor: string;
    public apiPatch: string;

    public operationList: Operation[];

    constructor(service) {
        service = service || {};
        this.id = service.id || null;
        this.name = service.name || null;
        this.details = service.details || null;
        this.scheme = service.scheme || null;
        this.host = service.host || null;
        this.port = service.port || null;
        this.servicePath = service.servicePath || null;
        this.apiPath = service.apiPath || null;
        this.versionPath = service.versionPath || null;
        this.apiMajor = service.apiMajor || null;
        this.apiMinor = service.apiMinor || null;
        this.apiPatch = service.apiPatch || null;
        this.operationList = service.operationList || null;
    }

}
