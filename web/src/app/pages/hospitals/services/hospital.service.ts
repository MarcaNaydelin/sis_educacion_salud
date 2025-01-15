import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HospitalStore, HospitalStoreImage, HospitalUpdate } from '../models/hospital';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  constructor(
    private _httpClient: HttpClient
  ){}

  list(size: number,pageNumber: number, searchBy: string = '') {//metodo paar obtener lista de los usuarios
    const params = new HttpParams()
    .set("per_page", size)
    .set("page", pageNumber)
    .set("search", searchBy);
      return this._httpClient.get(
        `${environment.api}/hospitals`,
        {params}
      )
    }
    //metodo para registrar
    store(hospital: HospitalStore){ // se llama a la solicutud donde se tiene los datos del usuario
      return this._httpClient.post<HospitalStore>(//se hace una peticion post para crear al nuevo usuario
        `${environment.api}/hospitals`,//url de la solicitud
        hospital//objeto
      )
    }
    show(id: number){// muestra los detalles de un usuario
      return this._httpClient.get<number>(//se hace una solicitud get para ver los datos del usuario
        `${environment.api}/hospitals/${id}`
      )
    }
    update(id: number, hospital: HospitalUpdate){//metodo para actualizar datos del usuario
      return this._httpClient.patch<HospitalUpdate>(//
        `${environment.api}/hospitals/${id}`,
        hospital
      )
    }
    destroy(id: number) { //metodo para eliminar un usuario especifico
      return this._httpClient.delete<number>(
        `${environment.api}/hospitals/${id}`
      )
    }

    listImages(id: number) {
      return this._httpClient.get(
        `${environment.api}/hospitals/images/${id}`
      )
    }

    uploadImage(hospitalStoreImage: any) {
      return this._httpClient.post<any>(
        `${environment.api}/hospitals/images`,
        hospitalStoreImage
      );
    }

    destroyImage(id: number) {
      return this._httpClient.patch<any>(
        `${environment.api}/hospitals/images/${id}`,
        id
      )
    }
    getListByStatus() {
      return this._httpClient.get(
        `${environment.api}/hospitals/get-by-status`,
      )
    }
}
