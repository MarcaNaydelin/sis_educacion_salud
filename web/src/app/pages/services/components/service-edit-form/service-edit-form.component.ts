import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Service, ServiceUpdate } from '../../models/service';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-service-edit-form',
  templateUrl: './service-edit-form.component.html'
})
export class ServiceEditFormComponent implements OnInit {
  @Input() service: Service;

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

  ngOnInit() {
    if (this.service) {
      this.form.FormGroup.patchValue(this.service);
    }
  }

  loadForm(){
    this._serviceService.show(this.service.id.toString())
    .subscribe({
      next: (resp:any) => {
        this.form.FormGroup.patchValue(resp.data);
      },
      error: (err) => {
        this._toastrService.error("Nose pudo cargar los datos de los servicios")
      },
      complete: () => {}
    })
  }

  get Form() {return this.form.FormGroup.controls}

  formSubmit() {
    this.form.submitted = true;
    if(this.form.FormGroup.valid) {
      this.form.submitting = true;
      let updateService: ServiceUpdate = this.form.FormGroup.getRawValue();
      this._serviceService.update(this.service.id,updateService)
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
