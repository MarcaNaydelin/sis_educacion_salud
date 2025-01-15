export interface Course {
  id: number,
  name: string,
  description: string,
}


export type   CourseStore = Omit<Course, 'id' | 'created_at' | 'updated_at'>

export type CourseUpdate = Omit<Course, 'id'| 'name' | 'description'>
& Partial<Pick<Course, 'name' | 'description'>>


export interface CourseResponse {
  message: string,
  data: Course
}
