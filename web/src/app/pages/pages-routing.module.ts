import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './dashboards/default/default.component';
import { Page404Component } from './utilitys/pages/page404/page404.component';

const routes: Routes = [
  { path: "", component: DefaultComponent},
  { path: 'unauthorized', component: Page404Component},
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
  { path: '', loadChildren: () => import('./hospitals/hospital.module').then(m => m.HospitalModule)},
  { path: '', loadChildren: () => import('./services/service.module').then(m => m.ServiceModule)},
  { path: '', loadChildren: () => import('./users/user.module').then(m => m.UserModule)},
  { path: '', loadChildren: () => import('./roles/rol.module').then(m => m.RolModule)},
  { path: '', loadChildren: () => import('./courses/course.module').then(m => m.CourseModule)},
  { path: '', loadChildren: () => import('./schools/school.module').then(m => m.SchoolModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
