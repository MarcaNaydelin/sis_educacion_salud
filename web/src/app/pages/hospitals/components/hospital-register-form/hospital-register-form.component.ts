import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HospitalService } from '../../services/hospital.service';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HospitalStore } from '../../models/hospital';
import { latLng, tileLayer, marker, Map, LeafletMouseEvent, icon } from 'leaflet';
import { ServiceService } from 'src/app/pages/services/services/service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-hospital-register-form',
  templateUrl: './hospital-register-form.component.html',
  styleUrls: ['./hospital-register-form.component.scss']
})
export class HospitalRegisterFormComponent implements OnInit{

  // Coordenadas de Cochabamba, Bolivia
  private readonly COCHABAMBA_LAT = -17.3895;
  private readonly COCHABAMBA_LNG = -66.1568;

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
    this._route.navigate(['/hospital']);
  }

  constructor(
    public bsModalRef: BsModalRef,
    private _hospitalService: HospitalService,
    private _toastrService: ToastrService,
    private _serviceService: ServiceService,
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
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        ]}),
      director: new FormControl<string>('', {nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        ]}),
      phone_numbers: new FormArray<FormControl<string>>([
        new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(8)] })
      ]),
      level: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
      shifts: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
      address: new FormControl<string>('', {nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\-\#\,\.]+$/)
        ]}),
      zone: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
      district: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
      status: new FormControl<boolean>(true, {nonNullable: true, validators: [Validators.required]}),
      location: new FormControl<object>(null, {nonNullable: true, validators: [Validators.required]}),
      services: new FormControl<Array<number>>(null, {nonNullable: true, validators: [Validators.required]})
    })
  };


  ngOnInit(): void {
    this.setTemplateSelectService();
  }

  setTemplateSelectService() {
    this._serviceService.getAllServices().subscribe({
      next: (resp) => {
        this.selectValue = resp["data"];
      }
    })
  }

  get phonesNumbersControls() {
    return (this.form.FormGroup.get('phone_numbers') as FormArray).controls;
  }

  addPhoneNumber() {
    (this.form.FormGroup.get('phone_numbers') as FormArray).push(
      new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(8)] })
    );
  }

  removePhoneNumber(index: number) {
    if(index > 0) {
      (this.form.FormGroup.get('phone_numbers') as FormArray).removeAt(index);
    }
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
      let newHospital: HospitalStore = this.form.FormGroup.getRawValue();
      this._hospitalService.store(newHospital)
      .subscribe({
        next:(resp) => {
          this._toastrService.success(resp["messages"]);
          this._route.navigate(['/hospital']);
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
