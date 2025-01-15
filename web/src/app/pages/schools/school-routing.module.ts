import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SchoolPageComponent } from './pages/school-page/school-page.component';
import { SchoolRegisterFormComponent } from './components/school-register-form/school-register-form.component';
import { SchoolEditFormComponent } from './components/school-edit-form/school-edit-form.component';
import { PermissionGuard } from 'src/app/core/guards/permissions.guard';



const routes: Routes =[
  {
    path: 'school', component: SchoolPageComponent,
    canActivate: [PermissionGuard],
    data: {subject: 'schools', action: 'view'}
  },
  {
    path: 'school/registro', component: SchoolRegisterFormComponent,
    canActivate: [PermissionGuard],
    data: {subject: 'schools', action: 'create'}
  },
  {
    path: 'school/editar/:id', component: SchoolEditFormComponent,
    canActivate: [PermissionGuard],
    data: {subject: 'schools', action: 'edit'}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SchoolRoutingModule { }
