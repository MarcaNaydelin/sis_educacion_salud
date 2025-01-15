import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursePageComponent } from './pages/course-page/course-page.component';
import { CourseEditFormComponent } from './components/course-edit-form/course-edit-form.component';
import { CourseRegisterFormComponent } from './components/course-register-form/course-register-form.component';
import { CourseRoutingModule } from './course-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from '../../shared/ui/ui.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AbilityModule } from '@casl/angular';



@NgModule({
  declarations: [
    CoursePageComponent,
    CourseEditFormComponent,
    CourseRegisterFormComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    FormsModule,
    UIModule,
    AbilityModule
  ]
})
export class CourseModule { }
