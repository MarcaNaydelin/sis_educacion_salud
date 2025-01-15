import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientHospitalMapService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  listServices() {
    return this._httpClient.get(
      `${environment.api}/public/services`
    )
  }

  listFilterHospital() {
    return this._httpClient.get(
      `${environment.api}/public/hospitals-filters`
    )
  }

  getListHospitalByFilters(
      services: string[] = [],
      level: string = '',
      zone: string = '',
      district: string = ''
  ) {
    let params = new HttpParams()
    .set('level', level)
    .set('zone', zone)
    .set('district', district);

    services.forEach(service => {
      params = params.append('services[]', service);
    });
    return this._httpClient.get(
      `${environment.api}/public/hospitals`,
      {params}
    )
  }
}
