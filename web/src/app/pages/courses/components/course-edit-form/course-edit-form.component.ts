import { Component, Input, OnInit } from '@angular/core';
import { Course, CourseUpdate } from '../../models/course';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CourseService } from '../../services/course.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-edit-form',
  templateUrl: './course-edit-form.component.html',
  styleUrls: ['./course-edit-form.component.scss']
})
export class CourseEditFormComponent implements OnInit {
  @Input() course: Course;

    constructor(
      public bsModalRef: BsModalRef,
      private _courseService: CourseService,
      private _toastrService: ToastrService,
    ) {}

    form = {
      submitted: false,
      submitting: false,
      FormGroup: new FormGroup({
        name: new FormControl<string>(null, {nonNullable: true,
          validators: [
            Validators.required,
            Validators.pattern('^[a-zA-ZÁáÉéÍíÓóÚúÑñ ]*$')
          ]}),
        description: new FormControl<string>(null, {nonNullable: true,
          validators: [
            Validators.required,
            Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s,. ]+$')
          ]})
      })
    }

    ngOnInit() {
      if (this.course) {
        this.form.FormGroup.patchValue(this.course);
      }
    }

    loadForm(){
      this._courseService.show(this.course.id.toString())
      .subscribe({
        next: (resp:any) => {
          this.form.FormGroup.patchValue(resp.data);
        },
        error: (err) => {
          this._toastrService.error("Nose pudo cargar los datos de los cursos")
        },
        complete: () => {}
      })
    }

    get Form() {return this.form.FormGroup.controls}

    formSubmit() {
      this.form.submitted = true;
      if(this.form.FormGroup.valid) {
        this.form.submitting = true;
        let updateCourse: CourseUpdate = this.form.FormGroup.getRawValue();
        this._courseService.update(this.course.id,updateCourse)
        .subscribe({
          next:(resp) => {
            this._toastrService.success(resp["messages"]);
            this.bsModalRef.hide();
          },
          error:(error) => {
            this._toastrService.error(error["messages"], "Error!");
            this.form.submitting = false;
          },
          complete:() => {
            this.form.FormGroup.reset();
            this.form.submitting = false;
          }
        })
      }
    }
}
