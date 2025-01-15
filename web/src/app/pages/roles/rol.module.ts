import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolPageComponent } from './pages/rol-page/rol-page.component';
import { RolEditFormComponent } from './components/rol-edit-form/rol-edit-form.component';
import { RolRegisterFormComponent } from './components/rol-register-form/rol-register-form.component';
import { RolRoutingModule } from './rol-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { UIModule } from '../../shared/ui/ui.module';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { NgStepperModule } from 'angular-ng-stepper';
import { AbilityModule } from '@casl/angular';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [
    RolPageComponent,
    RolEditFormComponent,
    RolRegisterFormComponent
  ],
  imports: [
    CommonModule,
    RolRoutingModule,
    ReactiveFormsModule,
    UIModule,
    FormsModule,
    PaginationModule.forRoot(),
    NgStepperModule,
    CdkStepperModule,
    AbilityModule,
    TabsModule.forRoot()
  ]
})
export class RolModule { }
