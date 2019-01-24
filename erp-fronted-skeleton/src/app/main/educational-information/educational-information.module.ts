import {FuseSharedModule} from '@fuse/shared.module';
import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule, MatDatepickerModule,
    MatFormFieldModule, MatIconModule,
    MatInputModule, MatRadioModule, MatSelectModule, MatSidenavModule
} from '@angular/material';
import {EducationalInformationComponent} from './educational-information.component';
import { FuseSidebarModule } from '@fuse/components';
// import {FileUploadModule} from '../file-upload/file-upload.module';

@NgModule({
    declarations: [
        EducationalInformationComponent
    ],
    imports: [
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSidenavModule,
        FuseSidebarModule,
        MatRadioModule,
        MatDatepickerModule,
        MatAutocompleteModule,
        MatSelectModule,
        // FileUploadModule,

        FuseSharedModule,
    ],
    providers: [],
    exports: [
        EducationalInformationComponent
    ]
})

export class EducationalInformationModule {
}
