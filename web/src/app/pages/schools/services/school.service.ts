import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SchoolStore, SchoolUpdate } from '../models/school';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(
    private _httpClient: HttpClient
  ) { }
  list(size: number,pageNumber: number, searchBy: string = '') {//metodo paar obtener lista de los usuarios
      const params = new HttpParams()
      .set("per_page", size)
      .set("page", pageNumber)
      .set("search", searchBy);
        return this._httpClient.get(
          `${environment.api}/schools`,
          {params}
        )
      }
      //metodo para registrar
      store(school: SchoolStore){ // se llama a la solicutud donde se tiene los datos del usuario
        return this._httpClient.post<SchoolStore>(//se hace una peticion post para crear al nuevo usuario
          `${environment.api}/schools`,//url de la solicitud
          school//objeto
        )
      }
      show(id: number){// muestra los detalles de un usuario
        return this._httpClient.get<number>(//se hace una solicitud get para ver los datos del usuario
          `${environment.api}/schools/${id}`
        )
      }
      update(id: number, school: SchoolUpdate){//metodo para actualizar datos del usuario
        return this._httpClient.patch<SchoolUpdate>(//
          `${environment.api}/schools/${id}`,
          school
        )
      }
      destroy(id: number) { //metodo para eliminar un usuario especifico
        return this._httpClient.delete<number>(
          `${environment.api}/schools/${id}`
        )
      }

      listImages(id: number) {
        return this._httpClient.get(
          `${environment.api}/schools/images/${id}`
        )
      }

      uploadImage(schoolStoreImage: any) {
        return this._httpClient.post<any>(
          `${environment.api}/schools/images`,
          schoolStoreImage
        );
      }

      destroyImage(id: number) {
        return this._httpClient.patch<any>(
          `${environment.api}/schools/images/${id}`,
          id
        )
      }

      getListByStatus() {
        return this._httpClient.get(
          `${environment.api}/schools/get-by-status`,
        )
      }
}
