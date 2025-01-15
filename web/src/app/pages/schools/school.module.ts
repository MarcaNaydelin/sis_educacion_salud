import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolPageComponent } from './pages/school-page/school-page.component';
import { SchoolEditFormComponent } from './components/school-edit-form/school-edit-form.component';
import { SchoolRegisterFormComponent } from './components/school-register-form/school-register-form.component';
import { SchoolRegisterFileFormComponent } from './components/school-register-file-form/school-register-file-form.component';


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
import { SchoolRoutingModule } from './school-routing.module';
import { SchoolViewFilesComponentComponent } from './components/school-view-files-component/school-view-files-component.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AbilityModule } from '@casl/angular';

@NgModule({
  declarations: [
    SchoolPageComponent,
    SchoolEditFormComponent,
    SchoolRegisterFormComponent,
    SchoolRegisterFileFormComponent,
    SchoolViewFilesComponentComponent
  ],
  imports: [
    CommonModule,
    SchoolRoutingModule,
    UIModule,
    PaginationModule.forRoot(),
    TypeaheadModule.forRoot(),
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
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
export class SchoolModule { }
