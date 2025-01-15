import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layouts/layout.component';
import { ClientComponent } from './pages/client/client.component';
import { ClientHospitalMapComponent } from './pages/client-hospital-map/client-hospital-map.component';
import { ClientSchoolMapComponent } from './pages/client-school-map/client-school-map.component';

const routes: Routes = [
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  // tslint:disable-next-line: max-line-length
  { path: '', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate: [AuthGuard] },
  { path: 'client', component: ClientComponent },
  { path: 'client/hospital-map', component: ClientHospitalMapComponent },
  { path: 'client/school-map', component: ClientSchoolMapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
