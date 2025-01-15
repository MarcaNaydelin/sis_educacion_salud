import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HospitalPageComponent } from './pages/hospital-page/hospital-page.component';
import { HospitalRegisterFormComponent } from './components/hospital-register-form/hospital-register-form.component';
import { HospitalEditFormComponent } from './components/hospital-edit-form/hospital-edit-form.component';
import { PermissionGuard } from 'src/app/core/guards/permissions.guard';

const routes: Routes = [
  {
    path: 'hospital',
    component: HospitalPageComponent,
    canActivate: [PermissionGuard],
    data: {subject: 'hospitals', action: 'view'}
  },
  {
    path: 'hospital/registro',
    component: HospitalRegisterFormComponent,
    canActivate: [PermissionGuard],
    data: {subject: 'hospitals', action: 'create'}
  },
  {
    path: 'hospital/editar/:id',
    component: HospitalEditFormComponent,
    canActivate: [PermissionGuard],
    data: {subject: 'hospitals', action: 'edit'}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalRoutingModule { }
