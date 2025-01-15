export interface User {
  id: number,
  name: string,
  email: string,
  password: string,
  password_confirmation: string,
  is_active: boolean
}

export type UserStore = Omit<User, 'id' | 'created_at' | 'updated_at'>

export type UserUpdate = Omit<User, 'id'| 'name' | 'email'| 'password' | 'password_confirmation' | 'is_active'>
& Partial<Pick<User, 'name' | 'email'| 'password' | 'password_confirmation' | 'is_active'>>

export interface UserResponse {
  message: string,
  data: User
}
