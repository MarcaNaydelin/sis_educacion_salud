export interface School {
  id: number;
  name: string;
  type: string;
  shift: string;
  address: string;
  zone: string;
  district: string;
  status: boolean;
  courses: number[];
  location: object;
}

export type SchoolStore = Omit<School, 'id' | 'created_at' | 'updated_at'>

export type SchoolUpdate = Omit<School, 'id'| 'name'  | 'type' | 'shift' | 'address' | 'zone' | 'district' | 'status' | 'courses' | 'location'>
& Partial<Pick<School, 'name'  | 'type' | 'shift' | 'address' | 'zone' | 'district' | 'status' | 'courses' | 'location'>>

export interface SchoolResponse {
  message: string,
  data: School
}
