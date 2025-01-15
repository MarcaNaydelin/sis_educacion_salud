export interface Rol {
  id: number,
  name: string,
  description: string,
  permissions: number[];
}


export type RolStore = Omit<Rol, 'id' | 'created_at' | 'updated_at'>


export type RolUpdate = Omit<Rol, 'id'| 'name' | 'description' | 'permissions' >
& Partial<Pick<Rol, 'name' | 'description' | 'permissions'>>


export interface RolResponse {
  message: string,
  data: Rol
}
