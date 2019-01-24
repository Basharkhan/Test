import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {FuseSharedModule} from '@fuse/shared.module';

import {AuthModule} from './auth/auth.module';
import {
    MatAutocompleteModule,
    MatButtonModule, MatButtonToggleModule, MatChipsModule, MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatMenuModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule, MatTooltipModule
} from '@angular/material';
import { AdmissionFormSlipComponent } from './admission-form-slip/admission-form-slip.component';
import { AdmissionFormSlipModule } from './admission-form-slip/admission-form-slip.module';
import { EducationalInformationModule } from './educational-information/educational-information.module';


@NgModule({
    declarations: [],
    imports: [
        RouterModule,

        MatButtonModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatSelectModule,
        MatToolbarModule,
        MatButtonToggleModule,
        MatChipsModule,
        MatMenuModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatAutocompleteModule,

        FuseSharedModule,

        // Auth
        AuthModule,
        AdmissionFormSlipModule,
        EducationalInformationModule
    ],
    exports: []
})
export class ContentModule {
}
