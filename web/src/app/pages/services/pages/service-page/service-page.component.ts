import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { ServiceRegisterFormComponent } from '../../components/service-register-form/service-register-form.component';
import { ServiceEditFormComponent } from '../../components/service-edit-form/service-edit-form.component';
import { Service } from '../../models/service';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.scss']
})
export class ServicePageComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  serviceTable = {
    reload: new BehaviorSubject<void>(null)
  }

  pageSize$ = new BehaviorSubject<number>(10);
  pageNumber$ = new BehaviorSubject<number>(1);
  searchBy$ = new BehaviorSubject<string>("");
  totalItems = 0;

  serviceList$ = combineLatest([
    this.serviceTable.reload,
    this.pageSize$,
    this.pageNumber$,
    this.searchBy$
  ])
  .pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(() => this._serviceService.list(
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
    this.breadCrumbItems = [{ label: 'Servicios' }, { label: 'Lista de Servicios', active: true }];
  }

  constructor(
    private _modalService: BsModalService,
    private _serviceService: ServiceService,
    private _toastrService: ToastrService,
  ) {}

  openServiceFormRegister() {
    const modal = this._modalService.show(ServiceRegisterFormComponent)
    modal.onHide.subscribe(() => {
      this.serviceTable.reload.next();
    })
  }

  openServiceFormUpdate(service: Service) {
    const modal = this._modalService.show(ServiceEditFormComponent, {
      initialState: {
        service: service
      }
    })
    modal.onHide.subscribe(() => {
      this.serviceTable.reload.next();
    })
  }

  openServiceDeleteConfirm(id) {
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
        this._serviceService.destroy(id)
        .subscribe({
          next: (resp) => {//es cuando recibe una respuesta positiva del servidor
            this._toastrService.success(resp["message"], "Exito!")
            this.serviceTable.reload.next();
          },
          error: (err) => {//es cuando se recibe una respuesta fallida del servidor
            this._toastrService.error("Error al eliminar","Error!")
          },
          complete: () => {//es cuando termina la funcion aunque falle o este bien
            this.serviceTable.reload.next();
          }
        })
      }
    });
  }
}
