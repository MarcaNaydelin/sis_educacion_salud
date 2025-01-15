import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { tileLayer, latLng, marker } from 'leaflet';
import { ClientSchoolMapService } from './services/client-school-map.service';

@Component({
  selector: 'app-client-school-map',
  templateUrl: './client-school-map.component.html',
  styleUrls: ['./client-school-map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClientSchoolMapComponent implements OnInit{

  courses: string[];
  shift: string;
  zone: string;
  district: string;

  selectValue: string[];
  selectShift;
  selectZones;
  selectDistricts;

  // Coordenadas de Cochabamba, Bolivia
  private readonly COCHABAMBA_LAT = -17.3895;
  private readonly COCHABAMBA_LNG = -66.1568;

  options = {
    layers: [
      tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGhlbWVzYnJhbmQiLCJhIjoiY2xmbmc3bTV4MGw1ejNzbnJqOWpubzhnciJ9.DNkdZVKLnQ6I9NOz7EED-w",
        {
          id: "mapbox/streets-v11",
          maxZoom: 18,
          attribution: '© OpenStreetMap contributors'
        }
      )
    ],
    zoom: 13,
    center: latLng(this.COCHABAMBA_LAT, this.COCHABAMBA_LNG)
  };

  markers = [];

  constructor(
    private _clientService: ClientSchoolMapService
  ) {}

  ngOnInit(): void {
    this.loadServiceSelect();
    this.loadFilters();
  }

  loadServiceSelect() {
    this._clientService.listCourses().subscribe({
      next:(value: any) =>{
        this.selectValue = value.data.map(res => res.name);
      },
    })
  }

  loadFilters() {
    this._clientService.listFilterSchool().subscribe({
      next:(value: any) => {
        this.selectShift = value.data.levels;
        this.selectZones = value.data.zones;
        this.selectDistricts = value.data.districts;
      },
    })
  }

  getSchoolByFilters(
    services: string[] = [],
    nivel: string = '',
    zone: string = '',
    district: string = ''
  ) {
    this._clientService.getListSchoolByFilters(services,nivel,zone,district).subscribe({
      next: (resp:any) => {
          resp.data.map(school => {
            this.markers.push(marker(latLng(school.location.latitude,school.location.longitude)).bindPopup(
              `<h4>${school.name}</h4>
              <p>Direccion: ${school.address}</p>`
            ));
          })
      }
    })
  }

  onCoursesChange(values: any): void {
    this.courses = values;
    this.getSchoolByFilters(this.courses, this.shift, this.zone, this.district)
  }

  onShiftChange(event: any): void {
    this.shift = event.target.value;
    this.getSchoolByFilters(this.courses, this.shift, this.zone, this.district)
  }

  onZoneChange(event: any): void {
    this.zone = event.target.value;
    this.getSchoolByFilters(this.courses, this.shift, this.zone, this.district)
  }

  onDistrictChange(event: any): void {
    this.district = event.target.value;
    this.getSchoolByFilters(this.courses, this.shift, this.zone, this.district)
  }

}
