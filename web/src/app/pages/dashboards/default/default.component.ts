import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../hospitals/services/hospital.service';
import { SchoolService } from '../../schools/services/school.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  total_schools_active;
  total_schools_inactive
  total_schools;

  total_hospitals;
  total_hospitals_active;
  total_hospitals_inactive

  constructor(
    private _hospitalService: HospitalService,
    private _schoolService: SchoolService
  ) {
  }

  ngOnInit() {
    this.getListHospitalByStatus();
    this.getListSchoolByStatus();
  }

  getListHospitalByStatus() {
    this._hospitalService.getListByStatus().subscribe({
      next: (resp:any) => {
        let hospitals = resp.data
        this.total_hospitals_active = hospitals["count_hospital_active"];
        this.total_hospitals_inactive = hospitals["count_hospital_inactive"]
        this.total_hospitals = parseInt(this.total_hospitals_active)+parseInt(this.total_hospitals_inactive);
      },
      error: (resp:any) => {
      }
    });
  }
  getListSchoolByStatus() {
    this._schoolService.getListByStatus().subscribe({
      next: (resp:any) => {
        let schools = resp.data
        this.total_schools_active = schools["count_school_active"];
        this.total_schools_inactive = schools["count_school_inactive"]
        this.total_schools = parseInt(this.total_schools_active)+parseInt(this.total_schools_inactive);

      },
      error: (resp:any) => {

      }
    });
  }
}
