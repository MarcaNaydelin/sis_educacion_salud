import { NgModule } from '@angular/core';
import { RolPageComponent } from './pages/rol-page/rol-page.component';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from 'src/app/core/guards/permissions.guard';


const routes: Routes =[
  {
    path: 'rol',
    component: RolPageComponent,
    canActivate: [PermissionGuard],
    data: {subject: 'roles', action: 'view'}
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolRoutingModule { }
