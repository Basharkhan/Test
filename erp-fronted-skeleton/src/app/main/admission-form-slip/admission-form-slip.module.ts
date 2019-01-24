import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {FuseSharedModule} from '@fuse/shared.module';
import { AdmissionFormSlipComponent } from './admission-form-slip.component';
import { MatCardModule, 
        MatTabsModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatIconModule,
        MatAutocompleteModule,
        MatDialogModule
        } from '@angular/material';
import { FuseSidebarModule } from '@fuse/components';
import { EducationalInformationModule } from '../educational-information/educational-information.module';
import { EduInfoModalComponent } from './edu-info-modal/edu-info-modal.component';


const routes = [
    {
        path: 'admission-form-slip',
        component: AdmissionFormSlipComponent
    }
];

@NgModule({
    declarations: [AdmissionFormSlipComponent, EduInfoModalComponent],
    imports: [
        RouterModule.forChild(routes),

        FuseSharedModule,
        MatCardModule,
        MatTabsModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatIconModule,
        FuseSidebarModule,
        MatAutocompleteModule,
        EducationalInformationModule,
        MatDialogModule,
        MatAutocompleteModule
    ],
    exports: [
        AdmissionFormSlipComponent
    ],
    entryComponents: [EduInfoModalComponent]
})
export class AdmissionFormSlipModule {
}
