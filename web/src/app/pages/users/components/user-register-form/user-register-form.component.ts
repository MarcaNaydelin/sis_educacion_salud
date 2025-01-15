import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserStore } from '../../models/user';

@Component({
  selector: 'app-user-register-form',
  templateUrl: './user-register-form.component.html',
  styleUrls: ['./user-register-form.component.scss']
})
export class UserRegisterFormComponent {

  constructor(
    public bsModalRef: BsModalRef,
    private _userService: UserService,
    private _toastrService: ToastrService,
  ){}

  private emailPattern: string = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";

  form = {
    submitted: false,
    submitting: false,
    FormGroup: new FormGroup({
      name: new FormControl<string>(null, {nonNullable: true,
        validators: [
          Validators.required
        ]}),
      email: new FormControl<string>(null, {nonNullable: true,
        validators: [
          Validators.required,
          Validators.pattern(this.emailPattern),
          Validators.email
        ]}),
      password: new FormControl<string>(null, {nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(9)
        ]}),
      password_confirmation: new FormControl<string>(null, {nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(9)
        ]}),
      is_active: new FormControl<boolean>(false, {nonNullable: true})
    })
  }
  get Form() {return this.form.FormGroup.controls}

  formSubmit(){
    this.form.submitted = true;
    if(this.form.FormGroup.valid){
      this.form.submitting = true;
      let newUser: UserStore = this.form.FormGroup.getRawValue();
      this._userService.store(newUser)
      .subscribe({
        next:(resp) => {
          console.log(resp)
          this._toastrService.success(resp["messages"]);
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
