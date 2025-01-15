import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicePageComponent } from './pages/service-page/service-page.component';
import { PermissionGuard } from 'src/app/core/guards/permissions.guard';

const routes: Routes = [
  {
    path: 'service',
    component: ServicePageComponent,
    canActivate: [PermissionGuard],
    data: {subject: 'services', action: 'view'}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ServiceRoutingModule { }
