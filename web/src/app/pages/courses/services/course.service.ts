import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CourseStore, CourseUpdate } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  list(size: number,pageNumber: number, searchBy: string = '') {
    const params = new HttpParams()
    .set("per_page", size)
    .set("page", pageNumber)
    .set("search", searchBy);

      return this._httpClient.get(
        `${environment.api}/courses`,
        {params}
      )
    }
    store(course: CourseStore) {
      return this._httpClient.post<CourseStore>(
        `${environment.api}/courses`,
        course
      )
    }
    show(id: String) {
      return this._httpClient.get<String>(
        `${environment.api}/courses/${id}`
      )
    }
    update(id: number, course: CourseUpdate) {
      return this._httpClient.patch<CourseUpdate>(
        `${environment.api}/courses/${id}`,
        course
      )
    }
    destroy(id: String) {
      return this._httpClient.delete<String>(
        `${environment.api}/courses/${id}`
      )
    }

    getAllCourses() {
      return this._httpClient.get(
        `${environment.api}/courses/get-courses`
      )
    }
}
