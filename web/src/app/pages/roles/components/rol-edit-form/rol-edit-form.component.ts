import { Component, Input, OnInit } from '@angular/core';
import { Rol, RolUpdate } from '../../models/rol';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RolService } from '../../services/rol.service';


@Component({
  selector: 'app-rol-edit-form',
  templateUrl: './rol-edit-form.component.html',
  styleUrls: ['./rol-edit-form.component.scss']
})
export class RolEditFormComponent implements OnInit{

  @Input() rol: Rol;

  public permissions;
  public permissions_selected;

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

  ngOnInit() {
    this.loadForm();
    this.loadPermissions();
  }

  loadForm(){
    this._rolService.show(this.rol.id.toString())
    .subscribe({
      next: (resp:any) => {
        this.form.FormGroup.patchValue(resp.data);
        this.permissions_selected = resp.data.permissions;
        const formArray: FormArray = this.form.FormGroup.get('permissions') as FormArray;
        this.permissions_selected.map(value => {
          formArray.push(new FormControl(value))
        })
      },
      error: (err) => {
        this._toastrService.error("Nose pudo cargar los datos de los servicios")
      },
      complete: () => {}
    })
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
      let updateRol: RolUpdate = this.form.FormGroup.getRawValue();
      this._rolService.update(this.rol.id,updateRol)
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
