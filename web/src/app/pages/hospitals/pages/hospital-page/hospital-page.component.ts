import { Component, OnInit } from '@angular/core';
import { HospitalRegisterFormComponent } from '../../components/hospital-register-form/hospital-register-form.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HospitalService } from '../../services/hospital.service';
import { ToastrService } from 'ngx-toastr';
import { Hospital } from '../../models/hospital';
import { HospitalEditFormComponent } from '../../components/hospital-edit-form/hospital-edit-form.component';
import Swal from 'sweetalert2';
import { HospitalRegisterFileFormComponent } from '../../components/hospital-register-file-form/hospital-register-file-form.component';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { HospitalViewFilesComponent } from '../../components/hospital-view-files/hospital-view-files.component';

@Component({
  selector: 'app-hospital-page',
  templateUrl: './hospital-page.component.html',
  styleUrls: ['./hospital-page.component.scss']
})
export class HospitalPageComponent implements OnInit{

  breadCrumbItems: Array<{}>;

  hospitalTable= {
    reload: new BehaviorSubject<void>(null)
  }

  pageSize$ = new BehaviorSubject<number>(10);
  pageNumber$ = new BehaviorSubject<number>(1);
  searchBy$ = new BehaviorSubject<string>("");
  totalItems = 0;

  hospitalList$ = combineLatest([
    this.hospitalTable.reload,
    this.pageSize$,
    this.pageNumber$,
    this.searchBy$
  ])
  .pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(() => this._hospitalService.list(
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
    this.breadCrumbItems = [ { label: 'Hospitales' }, { label: 'Lista de Hospitales', active: true }];
  }

  constructor(//habilidades o atributos que tiene
    private _hospitalService: HospitalService,//para las solicitudes HTTP
    private _modalService: BsModalService,//permite hacer al componente en un modal
    private _toastrService: ToastrService,//mesajes de alertas
    private _route: Router
  ){}

  openHospitalFormRegister(){//metodo que abre un formulario modal
    this._route.navigate(['/hospital/registro']);

  }

  openHospitalFormUpdate(id: number){//Metodo para abrir formulario para actualizar los datos
    this._route.navigate(['/hospital/editar', id]);

  }

  openHospitalDeleteConfirm(id: number){
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
        this._hospitalService.destroy(id)//llama a la funcion del servicio para eliminar al usuario seleccionado
        .subscribe({
          next: (resp) => {//es cuando recibe una respuesta positiva del servidor
            this._toastrService.success(resp["message"], "Exito!")
            this.hospitalTable.reload.next();
          },
          error: (err) => {//es cuando se recibe una respuesta fallida del servidor
            this._toastrService.error("Error al eliminar","Error!")
          },
          complete: () => {//es cuando termina la funcion aunque falle o este bien
            this.hospitalTable.reload.next();
          }
        })
      }
    });
  }

  openHospitalFormRegisterFiles(id: number){
    const modal = this._modalService.show(HospitalRegisterFileFormComponent, {
      initialState: {
        id: id
      }
    })//el servicio muestra el modal de register
      modal.onHide.subscribe(() => {})
  }

  openHospitalViewFiles(id: number){
    const modal = this._modalService.show(HospitalViewFilesComponent,{
      initialState: {
        hospital_id: id
      }
    })
      modal.onHide.subscribe(() => {})
  }
}
