import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalPageComponent } from './pages/hospital-page/hospital-page.component';
import { HospitalEditFormComponent } from './components/hospital-edit-form/hospital-edit-form.component';
import { HospitalRegisterFormComponent } from './components/hospital-register-form/hospital-register-form.component';
import { HospitalRoutingModule } from './hospital-routing.module';

import { UIModule } from '../../shared/ui/ui.module';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HospitalRegisterFileFormComponent } from './components/hospital-register-file-form/hospital-register-file-form.component';
import { HospitalViewFilesComponent } from './components/hospital-view-files/hospital-view-files.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AbilityModule } from '@casl/angular';


@NgModule({
  declarations: [
    HospitalPageComponent,
    HospitalEditFormComponent,
    HospitalRegisterFormComponent,
    HospitalRegisterFileFormComponent,
    HospitalViewFilesComponent
  ],
  imports: [
    CommonModule,
    HospitalRoutingModule,
    CarouselModule.forRoot(),
    UIModule,
    PaginationModule.forRoot(),
    TypeaheadModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    LeafletModule,
    UiSwitchModule,
    NgSelectModule,
    NgxDropzoneModule,
    AbilityModule
  ]
})
export class HospitalModule { }
