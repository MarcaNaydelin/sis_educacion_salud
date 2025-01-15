import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicePageComponent } from './pages/service-page/service-page.component';
import { ServiceRegisterFormComponent } from './components/service-register-form/service-register-form.component';
import { ServiceRoutingModule } from './service-routing.module';


import { UIModule } from '../../shared/ui/ui.module';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ServiceEditFormComponent } from './components/service-edit-form/service-edit-form.component';
import { AbilityModule } from '@casl/angular';


@NgModule({
  declarations: [
    ServicePageComponent,
    ServiceRegisterFormComponent,
    ServiceEditFormComponent
  ],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    UIModule,
    PaginationModule.forRoot(),
    TypeaheadModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    AbilityModule
  ]
})

export class ServiceModule { }
