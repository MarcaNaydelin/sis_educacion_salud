import { FormControl } from "@angular/forms";

export interface Hospital {
  id: number;
  name: string;
  director: string;
  phone_numbers: string[];
  level: string;
  shifts: string;
  address: string;
  zone: string;
  district: string;
  status: boolean;
  services: number[];
  location: object;
}

export interface HospitalImage {
  id: number;
  files: string [];
  status: boolean[];
}

export type HospitalStore = Omit<Hospital, 'id' | 'created_at' | 'updated_at'>

export type HospitalUpdate = Omit<Hospital, 'id'| 'name' | 'director'| 'phone_numbers' | 'level' | 'shifts' | 'address' | 'zone' | 'district' | 'status' | 'services' | 'location'>
& Partial<Pick<Hospital, 'name' | 'director'| 'phone_numbers' | 'level' | 'shifts' | 'address' | 'zone' | 'district' | 'status' | 'services' | 'location'>>

export type HospitalStoreImage =  Omit<HospitalImage, 'created_at' | 'updated_at'>

export interface HospitalResponse {
  message: string,
  data: Hospital
}
