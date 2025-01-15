import { Component, Input, OnInit } from '@angular/core';
import { SchoolService } from '../../services/school.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-school-register-file-form',
  templateUrl: './school-register-file-form.component.html',
  styleUrls: ['./school-register-file-form.component.scss']
})
export class SchoolRegisterFileFormComponent  implements OnInit{

  @Input() id: number;
  files: File[] = [];
  previewImages: string[] = [];

  constructor(
    public bsModalRef: BsModalRef,
    private _schoolService: SchoolService,
    private _toastrService: ToastrService,
  ){}

  ngOnInit(): void {
  }

  form = {
    submitted: false,
    submitting: false,
    FormGroup: new FormGroup({
      school_id: new FormControl(null, [Validators.required]),
      images: new FormControl([], [Validators.required]),
      statuses: new FormArray([]),
    })
  };

  get Form() {
    return this.form.FormGroup.controls;
  }

  formSubmit() {
    this.form.submitted = true;
    this.form.FormGroup.get('school_id')?.setValue(this.id);
    console.log(this.form.FormGroup)
    if (this.form.FormGroup.valid) {
      this.form.submitting = true;

      const formData = new FormData();
      const statuses = this.form.FormGroup.get('statuses')?.value || [];
      const images = this.form.FormGroup.value.images;

      formData.append('school_id', this.form.FormGroup.get('school_id')?.value);
      images.forEach((file: File, index: number) => {
        formData.append(`files[${index}]`, file, file.name);
      });
      statuses.forEach((status: boolean, index: number) => {
        const value = status ? 1 : 0;
        formData.append(`status[${index}]`, value.toString());
      });

      this._schoolService.uploadImage(formData).subscribe({
        next: (resp: any) => {
          this._toastrService.success(resp["message"]);
          this.bsModalRef.hide();
        },
        error: (error) => {
          this._toastrService.error(error["messages"], "Error!");
          this.form.submitting = false;
        },
        complete: () => {
          this.form.FormGroup.reset();
          this.form.submitting = false;
        }
      })

    }
  }

  // File Upload
  onSelect(event: any): void {
    const addedFiles = event.addedFiles || [];
    const imagesControl = this.form.FormGroup.get('images');
    const statusesArray = this.form.FormGroup.get('statuses') as FormArray;

    if (this.files.length + addedFiles.length > 3) {
      this._toastrService.warning("Solo puede seleccionar hasta 3 imágenes.");
      return;
    }

    addedFiles.forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImages.push(reader.result as string);
      };
      reader.readAsDataURL(file);
      this.files.push(file);
      statusesArray.push(new FormControl(true));
    });

    if (imagesControl) {
      imagesControl.setValue(this.files);
      imagesControl.updateValueAndValidity();
    }
  }

  onRemove(index: number): void {
    const statusesArray = this.form.FormGroup.get('statuses') as FormArray;

    this.files.splice(index, 1);
    this.previewImages.splice(index, 1);
    statusesArray.removeAt(index);

    const imagesControl = this.form.FormGroup.get('images');
    if (imagesControl) {
      imagesControl.setValue(this.files);
      imagesControl.updateValueAndValidity();
    }
  }
}
