import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientSchoolMapComponent } from './client-school-map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    ClientSchoolMapComponent
  ],
  imports: [
    CommonModule,
    LeafletModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClientSchoolMapModule { }
