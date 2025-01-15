export interface Service {
  id: number,
  name: string,
  description: string,
}


export type ServiceStore = Omit<Service, 'id' | 'created_at' | 'updated_at'>

export type ServiceUpdate = Omit<Service, 'id'| 'name' | 'description'>
& Partial<Pick<Service, 'name' | 'description'>>


export interface ServiceResponse {
  message: string,
  data: Service
}
