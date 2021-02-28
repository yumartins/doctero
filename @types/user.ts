export interface User {
  id: number,
  name: string,
  email: string,
  phone?: string,
  avatar?: string | null,
  role_id: number | null,
  address?: string,
  company?: string,
  password: string,
  document: string,
  birthday?: string,
  company_id: number | null,
}
