import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServiceStore, ServiceUpdate } from '../models/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  list(size: number,pageNumber: number, searchBy: string = '') {
    const params = new HttpParams()
    .set("per_page", size)
    .set("page", pageNumber)
    .set("search", searchBy);

    return this._httpClient.get(
      `${environment.api}/services`,
      {params}
    )
  }
  store(service: ServiceStore) {
    return this._httpClient.post<ServiceStore>(
      `${environment.api}/services`,
      service
    )
  }
  show(id: String) {
    return this._httpClient.get<String>(
      `${environment.api}/services/${id}`
    )
  }
  update(id: number, service: ServiceUpdate) {
    return this._httpClient.patch<ServiceUpdate>(
      `${environment.api}/services/${id}`,
      service
    )
  }
  destroy(id: String) {
    return this._httpClient.delete<String>(
      `${environment.api}/services/${id}`
    )
  }

  getAllServices() {
    return this._httpClient.get(
      `${environment.api}/services/get-services`
    )
  }
}
