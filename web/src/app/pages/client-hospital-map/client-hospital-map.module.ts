import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientHospitalMapComponent } from './client-hospital-map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ClientHospitalMapComponent
  ],
  imports: [
    CommonModule,
    LeafletModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClientHospitalMapModule { }
