import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { RolRegisterFormComponent } from '../../components/rol-register-form/rol-register-form.component';
import { RolEditFormComponent } from '../../components/rol-edit-form/rol-edit-form.component';
import { Rol } from '../../models/rol';
import { RolService } from '../../services/rol.service';

@Component({
  selector: 'app-rol-page',
  templateUrl: './rol-page.component.html',
  styleUrls: ['./rol-page.component.scss']
})
export class RolPageComponent implements OnInit{

  breadCrumbItems: Array<{}>;

  rolTable = {
    reload: new BehaviorSubject<void>(null)
  }

  pageSize$ = new BehaviorSubject<number>(10);
  pageNumber$ = new BehaviorSubject<number>(1);
  searchBy$ = new BehaviorSubject<string>("");
  totalItems = 0;

  rolList$ = combineLatest([
    this.rolTable.reload,
    this.pageSize$,
    this.pageNumber$,
    this.searchBy$
  ])
  .pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(() => this._rolService.list(
      parseInt(this.pageSize$.value.toString()),
      this.pageNumber$.value,
      this.searchBy$.value.toString()
    ).pipe(
      tap(res => {
      this.totalItems = res ["pagination"]["total"]
      })
     ))
  );

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Roles' }, { label: 'Lista de Roles', active: true }];
  }

  constructor(
    private _rolService: RolService,
    private _modalService: BsModalService,
    private _toastrService: ToastrService,
  ) {}

  openRolFormRegister() {
    const modal = this._modalService.show(RolRegisterFormComponent)
    modal.onHide.subscribe(() => {
      this.rolTable.reload.next();
    })
  }

  openRolFormUpdate(rol: Rol) {
    const modal = this._modalService.show(RolEditFormComponent, {
      initialState: {
        rol: rol
      }
    })
    modal.onHide.subscribe(() => {
      this.rolTable.reload.next();
    })
  }

  openRolDeleteConfirm(rol: Rol) {
    Swal.fire({
      title: '¿Estás seguro de eliminar el registro?',
      text: '¡No se revertirá esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Si eliminar!',
      cancelButtonText: 'No cancelar'
    }).then(result => {
      if (result.value) {
        this._rolService.destroy(rol.id.toString())
        .subscribe({
          next: (resp) => {//es cuando recibe una respuesta positiva del servidor
            this._toastrService.success(resp["message"], "Exito!")
            this.rolTable.reload.next();
          },
          error: (err) => {//es cuando se recibe una respuesta fallida del servidor
            this._toastrService.error("Error al eliminar","Error!")
          },
          complete: () => {//es cuando termina la funcion aunque falle o este bien
            this.rolTable.reload.next();
          }
        })
      }
    });
  }

}
