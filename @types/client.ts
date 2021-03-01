export interface Client {
  id: number,
  type: 'BOTH' | 'CLIENT' | 'PROVIDER',
  name: string,
  note?: string,
  email: string,
  phone?: string,
  avatar?: string,
  address?: string,
  company?: string,
  document: string,
  birthday?: string,
  company_id: number,
}
