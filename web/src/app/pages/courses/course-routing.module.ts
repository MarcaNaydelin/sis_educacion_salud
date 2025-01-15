import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursePageComponent } from './pages/course-page/course-page.component';
import { PermissionGuard } from 'src/app/core/guards/permissions.guard';

const routes: Routes = [
  {path: 'course', component: CoursePageComponent, canActivate: [PermissionGuard], data: {subject: 'courses', action: 'view'}},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CourseRoutingModule { }
