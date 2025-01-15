import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { UserRegisterFormComponent } from './components/user-register-form/user-register-form.component';
import { UserRoutingModule } from './user-routing.module';


import { UIModule } from '../../shared/ui/ui.module';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserEditFormComponent } from './components/user-edit-form/user-edit-form.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { AssignRolFormComponent } from './components/assign-rol-form/assign-rol-form.component';
import { AbilityModule } from '@casl/angular';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { TabsModule } from 'ngx-bootstrap/tabs';


@NgModule({
  declarations: [
    UserPageComponent,
    UserRegisterFormComponent,
    UserEditFormComponent,
    AssignRolFormComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    UIModule,
    NgSelectModule,
    PaginationModule.forRoot(),
    TypeaheadModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    UiSwitchModule,
    AbilityModule,
    TabsModule.forRoot()
  ]
})
export class UserModule { }
