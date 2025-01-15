import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../services/school.service';
import { CourseService } from 'src/app/pages/courses/services/course.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { tileLayer, latLng, marker, Map } from 'leaflet';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { SchoolStore } from '../../models/school';

@Component({
  selector: 'app-school-register-form',
  templateUrl: './school-register-form.component.html',
  styleUrls: ['./school-register-form.component.scss']
})
export class SchoolRegisterFormComponent implements OnInit {
  private readonly COCHABAMBA_LAT = -17.3895;
  private readonly COCHABAMBA_LNG = -66.1568;

  isTecnicoSelected: boolean = false;
    selectValue;
    map: Map;
    currentMarker: any = null;

    options = {
      layers: [
        tileLayer(
          "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGhlbWVzYnJhbmQiLCJhIjoiY2xmbmc3bTV4MGw1ejNzbnJqOWpubzhnciJ9.DNkdZVKLnQ6I9NOz7EED-w",
          {
            id: "mapbox/streets-v11",
            maxZoom: 18,
            attribution: '© OpenStreetMap contributors'
          }
        )
      ],
      zoom: 13,
      center: latLng(this.COCHABAMBA_LAT, this.COCHABAMBA_LNG)
    };
    markers = [];

    addMarker(event) {
      this.markers.pop();
      this.markers.push(marker(event.latlng));
    }

    closeModal() {
      this.bsModalRef.hide();
      this._route.navigate(['/school']);
    }

    constructor(
      public bsModalRef: BsModalRef,
      private _schoolService: SchoolService,
      private _toastrService: ToastrService,
      private _courseService: CourseService,
      private _route: Router
    ){}

    form = {
      submitted: false,
      submitting: false,
      FormGroup: new FormGroup({
        name: new FormControl('', {nonNullable: true,
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]+$/)
          ]}),
        address: new FormControl<string>('', {nonNullable: true,
          validators: [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(200),
            Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\-\#\,\.]+$/)
          ]}),
        zone: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
        district: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
        location: new FormControl<object>(null, {nonNullable: true, validators: [Validators.required]}),
        type: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
        shift: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
        status: new FormControl<boolean>(true, {nonNullable: true, validators: [Validators.required]}),
        courses: new FormControl<Array<number>>(null, {nonNullable: true, validators: [Validators.required]})
      })
    };

    ngOnInit(): void {
      this.setTemplateSelectCourses();
    }

    setTemplateSelectCourses() {
      this._courseService.getAllCourses().subscribe({
        next: (resp) => {
          this.selectValue = resp["data"];
        }
      })
    }

    onTypeChange(event: any): void {
      this.isTecnicoSelected = event.target.value === 'Tecnico';
    }

    get Form() {
      return this.form.FormGroup.controls;
    }

      formSubmit() {

        this.form.submitted = true;
        this.form.FormGroup.get('location')?.setValue({
          'latitude': (this.markers[0]._latlng.lat).toString(),
          'longitude' : (this.markers[0]._latlng.lng).toString()
        })
        if(this.form.FormGroup.valid) {
          this.form.submitting = true;
          let newSchool: SchoolStore = this.form.FormGroup.getRawValue();
          this._schoolService.store(newSchool)
          .subscribe({
            next:(resp) => {
              this._toastrService.success(resp["messages"]);
              this._route.navigate(['/school']);
            },
            error:(error) => {
              this._toastrService.error(error["messages"], "Error!");
              this.form.submitting = false;
            },
            complete:() => {
              this.bsModalRef.hide();
              this.form.FormGroup.reset();
              this.form.submitting = false;
            }
          })
        }
      }
}
