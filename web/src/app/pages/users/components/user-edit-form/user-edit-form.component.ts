import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User, UserUpdate } from '../../models/user';


@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.scss']
})

export class UserEditFormComponent implements OnInit{

  @Input() user: User;

  constructor(
    public bsModalRef: BsModalRef,
    private _userService: UserService,
    private _toastrService: ToastrService,
  ){}

  form = {
    submitted: false,
    submitting: false,
    FormGroup: new FormGroup({
      name: new FormControl<string>(null, {nonNullable: true, validators: [Validators.required]}),
      email: new FormControl<string>(null, {nonNullable: true, validators: [Validators.required]}),
      password: new FormControl<string>(null, {nonNullable: true, validators: []}),
      password_confirmation: new FormControl<string>(null, {nonNullable: true, validators: []}),
      is_active: new FormControl<boolean>(null, {nonNullable: true, validators: [Validators.required]})
    })
  }
  get Form() {return this.form.FormGroup.controls}

  ngOnInit(): void {
    this.form.FormGroup.patchValue({
      name: this.user.name,
      email: this.user.email,
      is_active: this.user.is_active
    });
    this.loadForm()
  }

  loadForm(){
    this._userService.show(this.user.id.toString())
    .subscribe({
      next: (resp:any) => {
        this.form.FormGroup.patchValue(resp.data);
      },
      error: (err) => {
        this._toastrService.error("Nose pudo cargar los datos del usuario")
      },
      complete: () => {}
    })
  }

  formSubmit(){
      this.form.submitted = true;
      if(this.form.FormGroup.valid){
        this.form.submitting = true;
        let updateUser: UserUpdate = this.form.FormGroup.getRawValue();
        this._userService.update(this.user.id.toString(), updateUser)
        .subscribe({
          next:(resp) => {
            this._toastrService.success(resp["messages"]);
            this.bsModalRef.hide();
          },
          error:(error) => {
            console.log(error)
            this._toastrService.error(error["message"], "Error!");
            this.form.submitting = false;
          },
          complete: () => {
            this.bsModalRef.hide();
            this.form.FormGroup.reset();
            this.form.submitting = false;
          }
        })
      }
    }

}
