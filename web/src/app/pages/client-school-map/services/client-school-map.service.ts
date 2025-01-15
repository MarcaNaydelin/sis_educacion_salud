import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientSchoolMapService {
  constructor(
    private _httpClient: HttpClient
  ) { }

  listCourses() {
    return this._httpClient.get(
      `${environment.api}/public/courses`
    )
  }

  listFilterSchool() {
    return this._httpClient.get(
      `${environment.api}/public/schools-filters`
    )
  }

  getListSchoolByFilters(
      courses: string[] = [],
      level: string = '',
      zone: string = '',
      district: string = ''
  ) {
    let params = new HttpParams()
    .set('level', level)
    .set('zone', zone)
    .set('district', district);

    courses.forEach(course => {
      params = params.append('courses[]', course);
    });
    return this._httpClient.get(
      `${environment.api}/public/schools`,
      {params}
    )
  }
}
