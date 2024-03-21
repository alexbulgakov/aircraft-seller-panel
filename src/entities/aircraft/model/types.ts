export type AircraftType = {
  id: number
  name: string
  supplierEmail: string
  count: number
  price: number
  delivery?: {
    country: string
    city: string[]
  }
}
