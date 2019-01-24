import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router';
import {User} from '../../model/auth/user.model';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class RouterGuard implements CanActivate {

    constructor(
        public router?: Router,
        public _cookieService?: CookieService) {
    }

    public hasAccessToDoOperationWithNavigate(operationExists: any): boolean {
        const operationExistsArray = operationExists.split(',').map(function (operationTemp): string {
            return operationTemp.trim();
        });

        const user: User = JSON.parse(localStorage.getItem('user'));
        if (user == null) {
            this._cookieService.deleteAll();
            this.router.navigate(['login']);
        }

        const authorizedOperationList: string[] = JSON.parse(localStorage.getItem('authorizedOperationList'));

        const hasPermission = operationExistsArray.every((operation) => authorizedOperationList.includes(operation));

        // console.log('operationExistsArray: ' + operationExistsArray);
        // console.log('authorizedOperationList: ' + authorizedOperationList);

        const tokenExpiryTime: number = user.tokenExpiredAt;
        const currentTimeInMs: number = Math.round(Date.now() / 1000);

        if (tokenExpiryTime < currentTimeInMs) {
            this._cookieService.deleteAll();
            this.router.navigate(['login']);
            return false;
        }

        if (!hasPermission) {
            this.router.navigate(['500']);
            return false;
        }
        return true;
    }

    public hasAccessToDoOperation(operationExists: any): boolean {
        const operationExistsArray = operationExists.split(',').map(function (operationTemp): string {
            return operationTemp.trim();
        });

        const user: User = JSON.parse(localStorage.getItem('user'));
        if (user == null) {
        }

        const authorizedOperationList: string[] = JSON.parse(localStorage.getItem('authorizedOperationList'));

        const hasPermission = operationExistsArray.every((operation) => authorizedOperationList.includes(operation));

        const tokenExpiryTime: number = user.tokenExpiredAt;
        const currentTimeInMs: number = Math.round(Date.now() / 1000);

        if (tokenExpiryTime < currentTimeInMs) {
            return false;
        }

        if (!hasPermission) {
            return false;
        }
        return true;
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        return this.hasAccessToDoOperationWithNavigate(route.data.operationExists);
    }
}
