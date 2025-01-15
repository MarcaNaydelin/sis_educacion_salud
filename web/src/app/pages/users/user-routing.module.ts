import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { PermissionGuard } from 'src/app/core/guards/permissions.guard';

const routes: Routes = [
  {
    path: 'user',
    component: UserPageComponent,
    canActivate: [PermissionGuard],
    data: {subject: 'users', action: 'view'}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
