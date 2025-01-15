import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserStore, UserUpdate } from '../models/user';
import { RolesPermissions } from '../models/assingRolesPermission';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  list(size: number,pageNumber: number, searchBy: string = '') {
    const params = new HttpParams()
    .set("per_page", size)
    .set("page", pageNumber)
    .set("search", searchBy);

    return this._httpClient.get(
      `${environment.api}/users`,
      {params}
    )
  }
  //metodo para registrar
  store(user: UserStore){ // se llama a la solicutud donde se tiene los datos del usuario
    return this._httpClient.post<UserStore>(//se hace una peticion post para crear al nuevo usuario
      `${environment.api}/users`,//url de la solicitud
      user//objeto
    )
  }
  show(id: String){// muestra los detalles de un usuario
    return this._httpClient.get<String>(//se hace una solicitud get para ver los datos del usuario
      `${environment.api}/users/${id}`
    )
  }
  update(id: string, user: UserUpdate){//metodo para actualizar datos del usuario
    return this._httpClient.patch<UserUpdate>(//
      `${environment.api}/users/${id}`,
      user
    )
  }
  destroy(id: String) { //metodo para eliminar un usuario especifico
    return this._httpClient.delete<String>(
      `${environment.api}/users/${id}`
    )
  }

  getRoles(){
    return this._httpClient.get(
      `${environment.api}/roles/get-roles`
    )
  }

  getRolesAndPermissions(id: number) { //metodo para obtener los roles y permisios de un usuario especifico
    return this._httpClient.get(
      `${environment.api}/users/roles-permissions/${id}`
    )
  }

  setRolesAndPermissions(id: number, roles_permissions: RolesPermissions) { //metodo para actualizar los roles y permisios de un usuario especifico
    return this._httpClient.post<RolesPermissions>(
      `${environment.api}/users/roles-permissions/${id}`,
      roles_permissions
    )
  }
}
