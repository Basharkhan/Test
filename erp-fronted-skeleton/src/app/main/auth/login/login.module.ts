import {FuseSharedModule} from '@fuse/shared.module';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule, MatIconModule,
    MatInputModule,
    MatSnackBarModule
} from '@angular/material';

import {LoginComponent} from './login.component';
import {AuthService} from '../../../service/auth/auth.service';

const routes = [
    {
        path: 'login',
        component: LoginComponent
    }
];

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatIconModule,

        FuseSharedModule,
    ],
    providers: [
        // Auth
        AuthService

    ],
    exports: [
        LoginComponent
    ]
})

export class LoginModule {
}
