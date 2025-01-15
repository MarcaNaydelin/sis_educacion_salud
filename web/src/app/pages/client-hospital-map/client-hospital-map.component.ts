import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { tileLayer, latLng, circle, polygon, marker } from 'leaflet';
import { ClientHospitalMapService } from './services/client-hospital-map.service';


@Component({
  selector: 'app-client-hospital-map',
  templateUrl: './client-hospital-map.component.html',
  styleUrls: ['./client-hospital-map.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class ClientHospitalMapComponent implements OnInit{


  services: string[];
  nivel: string;
  zone: string;
  district: string;

  selectValue: string[];
  selectLevel;
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
    private _clientService: ClientHospitalMapService
  ) {}


  ngOnInit(): void {
    this.loadServiceSelect();
    this.loadFilters();
  }

  loadServiceSelect() {
    this._clientService.listServices().subscribe({
      next:(value: any) =>{
        this.selectValue = value.data.map(res => res.name);
      },
    })
  }

  loadFilters() {
    this._clientService.listFilterHospital().subscribe({
      next:(value: any) => {
        this.selectLevel = value.data.levels;
        this.selectZones = value.data.zones;
        this.selectDistricts = value.data.districts;
      },
    })
  }

  getHospitalByFilters(
    services: string[] = [],
    nivel: string = '',
    zone: string = '',
    district: string = ''
  ) {
    this._clientService.getListHospitalByFilters(services,nivel,zone,district).subscribe({
      next: (resp:any) => {
        this.markers = []; // Limpia los marcadores previos
        resp.data.map(hospital => {
          this.markers.push(marker(latLng(hospital.location.latitude,hospital.location.longitude)).bindPopup(
            `<h4>${hospital.name}</h4>
            <p><strong>Dirección:</strong>${hospital.address}</p>
            <p><strong>Nivel:</strong> ${hospital.level}</p>
            <p><strong>Distrito:</strong> ${hospital.district}</p>
            <p><strong>Zona:</strong> ${hospital.zone}</p>
            <p><strong>Servicios:</strong> ${hospital.services?.join(', ')}</p>`
          ));
        });
        this.triggerAnimation(); //
      }
    })
  }

  onServicesChange(values: any): void {
    this.services = values;
    this.getHospitalByFilters(
      this.services,
      this.nivel || '',
      this.zone || '',
      this.district || ''
    )
  }

  onLevelChange(event: any): void {
    this.nivel = event.target.value;
    this.getHospitalByFilters(
      this.services || [],
      this.nivel,
      this.zone || '',
      this.district || ''
    )
  }

  onZoneChange(event: any): void {
    this.zone = event.target.value;
    this.getHospitalByFilters(
      this.services || [],
      this.nivel || '',
      this.zone,
      this.district || ''
    )
  }

  onDistrictChange(event: any): void {
    this.district = event.target.value;
    this.getHospitalByFilters(
      this.services || [],
      this.nivel || '',
      this.zone || '',
      this.district
    )
  }

  isUpdated: boolean = false;

  triggerAnimation(): void {
    this.isUpdated = true;
  }

  resetAnimation(): void {
    this.isUpdated = false;
  }

}
