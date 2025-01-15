import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RolStore } from '../../models/rol';
import { RolService } from '../../services/rol.service';


@Component({
  selector: 'app-rol-register-form',
  templateUrl: './rol-register-form.component.html',
  styleUrls: ['./rol-register-form.component.scss']
})
export class RolRegisterFormComponent implements OnInit{


  public permissions;

  constructor(
    public bsModalRef: BsModalRef,
    private _rolService: RolService,
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
      ]}),
      permissions: new FormArray([])
    })
  }


  ngOnInit(): void {
    this.loadPermissions();
  }

  get Form() {return this.form.FormGroup.controls}

  onCheckChange(event) {
    const formArray: FormArray = this.form.FormGroup.get('permissions') as FormArray;

    if(event.target.checked){
      formArray.push(new FormControl(event.target.value));
    }
    else{
      let i: number = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if(ctrl.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  formSubmit() {
    this.form.submitted = true;
    if(this.form.FormGroup.valid) {
      this.form.submitting = true;
      let newRol: RolStore = this.form.FormGroup.getRawValue();
      this._rolService.store(newRol)
      .subscribe({
        next:(resp) => {
          this._toastrService.success(resp['messages']);
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

  loadPermissions() {
    this._rolService.getListOfPermissions().subscribe({
      next: (resp: any) => {
        this.permissions = resp.data;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
