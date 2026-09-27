export interface Product {
  id: string
  branchId: string
  name: string
  description?: string
  price?: number
  image?: string
  category?: string
  available?: boolean
}

// Add only products and prices confirmed by Brunchy Brunch.
export const products: Product[] = []
