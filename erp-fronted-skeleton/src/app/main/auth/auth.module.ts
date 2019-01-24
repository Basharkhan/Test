import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {FuseSharedModule} from '@fuse/shared.module';

import {LoginModule} from './login/login.module';

@NgModule({
    declarations: [],
    imports: [
        RouterModule,

        FuseSharedModule,

        // Auth
        LoginModule,
    ],
    exports: []
})
export class AuthModule {
}
