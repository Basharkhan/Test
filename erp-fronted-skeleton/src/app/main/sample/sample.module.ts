import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { SampleComponent } from './sample.component';
import {MessagingService} from '../../service/notification/messaging.service';
import {AsyncPipe} from '@angular/common';

const routes = [
    {
        path     : 'sample',
        component: SampleComponent
    }
];

@NgModule({
    declarations: [
        SampleComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,
    ],
    providers: [MessagingService, AsyncPipe],
    exports     : [
        SampleComponent
    ]
})

export class SampleModule
{
}
