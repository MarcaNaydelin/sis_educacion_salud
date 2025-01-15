import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserUpdate } from '../../models/user';
import { User } from 'src/app/core/models/auth.models';
import { RolService } from 'src/app/pages/roles/services/rol.service';
import { RolesPermissions } from '../../models/assingRolesPermission';

@Component({
  selector: 'app-assign-rol-form',
  templateUrl: './assign-rol-form.component.html',
  styleUrls: ['./assign-rol-form.component.scss']
})
export class AssignRolFormComponent implements OnInit{

  @Input() user: User;

  selectValue;
  selectedRoles;

  permissions_selected;
  permissions;

  constructor(
      public bsModalRef: BsModalRef,
      private _userService: UserService,
      private _toastrService: ToastrService,
      private _rolService: RolService,
    ){}

    form = {
      submitted: false,
      submitting: false,
      FormGroup: new FormGroup({
        roles: new FormControl<Array<number>>(null, {nonNullable: true}),
        permissions: new FormArray([])
    })
    }

    ngOnInit(): void {
      this.loadForm();
      this.setTemplateSelectRoles();
      this.loadPermissions();
    }

    setTemplateSelectRoles() {
      this._userService.getRoles().subscribe({
        next: (resp:any) => {
          this.selectValue = resp.data
        }
      });
    }

    compareFn(item1: any, item2: any): boolean {
      return item1 && item2 ? item1.id === item2.id : item1 === item2;
    }

    loadForm(){
      this._userService.getRolesAndPermissions(this.user.id)
      .subscribe({
        next: (resp:any) => {
          this.form.FormGroup.patchValue(resp.data);
          //PERMISSIONS
          this.permissions_selected = resp.data.permissions;
          const formArray: FormArray = this.form.FormGroup.get('permissions') as FormArray;
          this.permissions_selected.map(value => {
            formArray.push(new FormControl(value))
          })
          //ROLES
          if (resp.data.roles && this.form.FormGroup.controls['roles']) {
            this.selectedRoles = resp.data.roles
          }
        },
        error: (err) => {
          this._toastrService.error("Nose pudo cargar los roles del usuario")
        },
        complete: () => {}
      })
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

    get Form() {
      return this.form.FormGroup.controls;
    }


    formSubmit(){
      this.form.submitted = true;
      if(this.form.FormGroup.valid){
        this.form.submitting = true;
        let roles_permissions: RolesPermissions = this.form.FormGroup.getRawValue();
        roles_permissions.roles = roles_permissions.roles.map((role:any) => role.id);
        this._userService.setRolesAndPermissions(this.user.id, roles_permissions)
        .subscribe({
          next:(resp) => {
            this._toastrService.success(resp["message"]);
          },
          error:(error) => {
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
}
