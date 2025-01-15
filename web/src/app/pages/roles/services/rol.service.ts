import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RolStore, RolUpdate } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  list(size: number,pageNumber: number, searchBy: string = '') {
    const params = new HttpParams()
    .set("per_page", size)
    .set("page", pageNumber)
    .set("search", searchBy);

      return this._httpClient.get(
        `${environment.api}/roles`,
        {params}
      )
    }
    store(rol: RolStore) {
      return this._httpClient.post<RolStore>(
        `${environment.api}/roles`,
        rol
      )
    }
    show(id: String) {
      return this._httpClient.get<String>(
        `${environment.api}/roles/${id}`
      )
    }
    update(id: number, rol: RolUpdate) {
      return this._httpClient.patch<RolUpdate>(
        `${environment.api}/roles/${id}`,
        rol
      )
    }
    destroy(id: String) {
      return this._httpClient.delete<String>(
        `${environment.api}/roles/${id}`
      )
    }

    getListOfPermissions() {
      return this._httpClient.get(
        `${environment.api}/permissions`
      );
    }
}
