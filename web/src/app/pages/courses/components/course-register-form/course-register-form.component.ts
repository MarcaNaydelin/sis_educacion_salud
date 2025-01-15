import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CourseService } from '../../services/course.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseStore } from '../../models/course';

@Component({
  selector: 'app-course-register-form',
  templateUrl: './course-register-form.component.html',
  styleUrls: ['./course-register-form.component.scss']
})
export class CourseRegisterFormComponent {
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
            Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s,. ]+$'),
            Validators.minLength(10),
            Validators.maxLength(500)
          ]})
      })
    }

    get Form() {return this.form.FormGroup.controls}

    formSubmit() {
      this.form.submitted = true;
      if(this.form.FormGroup.valid) {
        this.form.submitting = true;
        let newCourse: CourseStore = this.form.FormGroup.getRawValue();
        this._courseService.store(newCourse)
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
