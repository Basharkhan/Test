import {Service} from './service.model';

export class Operation {
    public id: string;
    public name: string;
    public details: string;
    public service: Service;
    public path: string;

    constructor(operation) {
        operation = operation || {};
        this.id = operation.id || null;
        this.name = operation.name || null;
        this.details = operation.details || null;
        this.service = operation.service || null;
        this.path = operation.path || null;
    }

}
