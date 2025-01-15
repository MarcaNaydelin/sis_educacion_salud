import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  countHospitalSchool(){
    return this._httpClient.get(
      `${environment.api}/public/schools-hospitals`
    )
  }
}
