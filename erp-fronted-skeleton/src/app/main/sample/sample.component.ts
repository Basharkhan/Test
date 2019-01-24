import {Component, OnInit} from '@angular/core';

import {RouterGuard} from '../../service/auth/router.guard';
import {FuseProgressBarService} from '../../../@fuse/components/progress-bar/progress-bar.service';
import { HttpClient } from '@angular/common/http';
import {MessagingService} from '../../service/notification/messaging.service';

@Component({
    selector   : 'sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss']
})
export class SampleComponent implements OnInit
{
    public routerGuard: RouterGuard = new RouterGuard();

    constructor(
    ) {
    }

    ngOnInit(): void {
    }

    /*
 __  __    _____  __          ___ __
/  `/  \|\ |||__)/  \|   |   |__ |__)
\__,\__/| \|||  \\__/|___|___|___|  \

     */

}
