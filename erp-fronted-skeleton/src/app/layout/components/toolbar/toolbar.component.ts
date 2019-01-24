import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { navigation } from 'app/navigation/navigation';
import {AuthService} from '../../../service/auth/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {FileServerService} from '../../../service/user/file-upload/file-server.service';
import {Employee} from '../../../model/employee-information/employee.model';
import {User} from '../../../model/auth/user.model';

@Component({
    selector     : 'toolbar',
    templateUrl  : './toolbar.component.html',
    styleUrls    : ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy
{
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    navigation: any;
    userStatusOptions: any[];
    public fileServerBasePath: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private _router: Router,
        private authService: AuthService,
        private _cookieService: CookieService
    )
    {
        this.fileServerBasePath = FileServerService.fileServerBasePath;
        // Set the defaults
        this.userStatusOptions = [
            {
                'title': 'Online',
                'icon' : 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon' : 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon' : 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];

        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void
    {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Search
     *
     * @param value
     */
    search(value): void
    {
        // Do your search here...
        console.log(value);
    }

    logOut(): void {
        this.authService.logout().map((data) => {
            // console.log('Logout:--> ' + JSON.stringify(data));
            const result = data.result;

            if (result === 'success') {
                // reset login status
                // remove user from local storage to log user out
                localStorage.removeItem('user');
                this._cookieService.deleteAll();
                this._router.navigate(['/login']);
            }
        }).subscribe(
            () => {
                // console.log(' NO ERROR FOUND ');
            },
            (error) => {
                console.log('GOT AN ERROR:--> ' + JSON.stringify(error));
            });
    }

    public localStorageItem(id: string): string {
        return JSON.parse(localStorage.getItem(id));
    }

    redirectToMyProfile(): void {
        const userType: string = JSON.parse(localStorage.getItem('user')).type;
        if (userType === 'EMPLOYEE') {
            this._router.navigate(['/employee/my_profile']);
        } else if (userType === 'STUDENT') {
            this._router.navigate(['/student/my_profile']);
        }
    }
}
