import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, debounce, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { CourseService } from '../../services/course.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CourseRegisterFormComponent } from '../../components/course-register-form/course-register-form.component';
import { Course } from '../../models/course';
import { CourseEditFormComponent } from '../../components/course-edit-form/course-edit-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit{

  breadCrumbItems: Array<{}>;

  courseTable = {
    reload: new BehaviorSubject<void>(null)
  }

  pageSize$ = new BehaviorSubject<number>(10);
  pageNumber$ = new BehaviorSubject<number>(1);
  searchBy$ = new BehaviorSubject<string>("");
  totalItems = 0;

    courseList$ = combineLatest([
      this.courseTable.reload,
      this.pageSize$,
      this.pageNumber$,
      this.searchBy$
    ])
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this._courseService.list(
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
      this.breadCrumbItems = [{ label: 'Cursos' }, { label: 'Lista de Cursos', active: true }];
    }

    constructor(
      private _modalService: BsModalService,
      private _courseService: CourseService,
      private _toastrService: ToastrService,
    ) {}

    openCourseFormRegister() {
      const modal = this._modalService.show(CourseRegisterFormComponent)
      modal.onHide.subscribe(() => {
        this.courseTable.reload.next();
      })
    }

    openCourseFormUpdate(course: Course) {
      const modal = this._modalService.show(CourseEditFormComponent, {
        initialState: {
          course: course
        }
      })
      modal.onHide.subscribe(() => {
        this.courseTable.reload.next();
      })
    }

    openCourseDeleteConfirm(id) {
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
          this._courseService.destroy(id)
          .subscribe({
            next: (resp) => {//es cuando recibe una respuesta positiva del servidor
              this._toastrService.success(resp["message"], "Exito!")
              this.courseTable.reload.next();
            },
            error: (err) => {//es cuando se recibe una respuesta fallida del servidor
              this._toastrService.error("Error al eliminar","Error!")
            },
            complete: () => {//es cuando termina la funcion aunque falle o este bien
              this.courseTable.reload.next();
            }
          })
        }
      });
    }

}
