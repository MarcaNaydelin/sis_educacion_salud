import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { SchoolService } from '../../services/school.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SchoolRegisterFormComponent } from '../../components/school-register-form/school-register-form.component';
import { SchoolViewFilesComponentComponent } from '../../components/school-view-files-component/school-view-files-component.component';
import { SchoolRegisterFileFormComponent } from '../../components/school-register-file-form/school-register-file-form.component';
import { Ability } from '@casl/ability';

@Component({
  selector: 'app-school-page',
  templateUrl: './school-page.component.html',
  styleUrls: ['./school-page.component.scss']
})
export class SchoolPageComponent implements OnInit {

  breadCrumbItems: Array<{}>;

    schoolTable= {
      reload: new BehaviorSubject<void>(null)
    }

    pageSize$ = new BehaviorSubject<number>(10);
    pageNumber$ = new BehaviorSubject<number>(1);
    searchBy$ = new BehaviorSubject<string>("");
    totalItems = 0;

    schoolList$ = combineLatest([
      this.schoolTable.reload,
      this.pageSize$,
      this.pageNumber$,
      this.searchBy$
    ])
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this._schoolService.list(
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
      this.breadCrumbItems = [ { label: 'Colegios' }, { label: 'Lista de Colegios', active: true }];
    }

    constructor(//habilidades o atributos que tiene
      private _schoolService: SchoolService,//para las solicitudes HTTP
      private _modalService: BsModalService,//permite hacer al componente en un modal
      private _toastrService: ToastrService,//mesajes de alertas
      private _route: Router,
      private ability: Ability
    ){}

    openSchoolFormRegister(){//metodo que abre un formulario modal
      this._route.navigate(['/school/registro']);

    }

    openSchoolFormUpdate(id){//Metodo para abrir formulario para actualizar los datos
      this._route.navigate(['/school/editar', id]);

    }

    openSchoolDeleteConfirm(id){
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
          this._schoolService.destroy(id)//llama a la funcion del servicio para eliminar al usuario seleccionado
          .subscribe({
            next: (resp) => {//es cuando recibe una respuesta positiva del servidor
              this._toastrService.success(resp["message"], "Exito!")
              this.schoolTable.reload.next();
            },
            error: (err) => {//es cuando se recibe una respuesta fallida del servidor
              this._toastrService.error("Error al eliminar","Error!")
            },
            complete: () => {//es cuando termina la funcion aunque falle o este bien
              this.schoolTable.reload.next();
            }
          })
        }
      });
    }

    openSchoolFormRegisterFiles(id: number){
      const modal = this._modalService.show(SchoolRegisterFileFormComponent, {
        initialState: {
          id: id
        }
      })//el servicio muestra el modal de register
        modal.onHide.subscribe(() => {})
    }

    openSchoolViewFiles(id: number){
      const modal = this._modalService.show(SchoolViewFilesComponentComponent,{
        initialState: {
          school_id: id
        }
      })
        modal.onHide.subscribe(() => {})
    }


}
