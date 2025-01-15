import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceStore } from '../../models/service';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-service-register-form',
  templateUrl: './service-register-form.component.html'
})
export class ServiceRegisterFormComponent {
  constructor(
    public bsModalRef: BsModalRef,
    private _serviceService: ServiceService,
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
      let newService: ServiceStore = this.form.FormGroup.getRawValue();
      this._serviceService.store(newService)
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
