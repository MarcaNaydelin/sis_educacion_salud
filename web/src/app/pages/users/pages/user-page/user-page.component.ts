import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { UserService } from '../../services/user.service';
import { UserRegisterFormComponent } from '../../components/user-register-form/user-register-form.component';
import { UserEditFormComponent } from '../../components/user-edit-form/user-edit-form.component';
import { User } from '../../models/user';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { U } from '@fullcalendar/core/internal-common';
import { AssignRolFormComponent } from '../../components/assign-rol-form/assign-rol-form.component';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  userTable = {// es un objeto
    reload: new BehaviorSubject<void>(null)//es un atributo de tipo behaviorSubject de tipo void(metodo)
  }

  pageSize$ = new BehaviorSubject<number>(10);//es un atributo de tipo behaviorSubject de tipo number
  pageNumber$ = new BehaviorSubject<number>(1);//es un atributo de tipo behaviorSubject de tipo number
  searchBy$ = new BehaviorSubject<string>("");//es un atributo de tipo behaviorSubject de tipo string
  totalItems = 0;

  userList$ = combineLatest([//optiene el ultimo cambio que tienen los observables de valor
    this.userTable.reload,
    this.pageSize$,
    this.pageNumber$,
    this.searchBy$
  ])
  .pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(() => this._userService.list(//llama del servicio a la fucnion de list(listar)
      parseInt(this.pageSize$.value.toString()),
      this.pageNumber$.value,
      this.searchBy$.value.toString()
    ).pipe(
      tap((res) => {
        this.totalItems = res ["pagination"]["total"]
      })
    ))
  );


  breadCrumbItems: Array<{}>;

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Usuarios' }, { label: 'Lista de Usuarios', active: true }];
  }

  constructor(//habilidades o atributos que tiene
    private _userService: UserService,//para las solicitudes HTTP
    private _modalService: BsModalService,//permite hacer al componente en un modal
    private _toastrService: ToastrService,//mesajes de alertas
  ){}

  openUserFormRegister(){//metodo que abre un formulario modal
    const modal = this._modalService.show(UserRegisterFormComponent)//el servicio muestra el modal de register
    modal.onHide.subscribe(() => {
      this.userTable.reload.next();
    })
  }

  openUserFormUpdate(user: User){//Metodo para abrir formulario para actualizar los datos
    const modal = this._modalService.show(UserEditFormComponent, {//el servicio muestra el modal de register
      initialState:{//carga los datos del usuario que se actualiza
        user: user
      }
    })
    modal.onHide.subscribe(() => {
      this.userTable.reload.next();
    })
  }

  openUserDeleteConfirm(user: User){
    Swal.fire({
      title:'Estas seguro de eliminar el registro?',
      text: 'No se revertira esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Si eliminar!',
      cancelButtonText: 'No cancelar'
    }).then(result =>{
      if (result.value){
        this._userService.destroy(user.id.toString())//llama a la funcion del servicio para eliminar al usuario seleccionado
        .subscribe({
          next: (resp) => {//es cuando recibe una respuesta positiva del servidor
            this._toastrService.success(resp["message"], "Exito!")
            this.userTable.reload.next();
          },
          error: (err) => {//es cuando se recibe una respuesta fallida del servidor
            this._toastrService.error("Error al eliminar","Error!")
          },
          complete: () => {//es cuando termina la funcion aunque falle o este bien

          }
        })
      }
    });
  }

  openAssignRoles(user){
    const modal = this._modalService.show(AssignRolFormComponent,{
      initialState: {
        user: user
      }
    })
  }
}
