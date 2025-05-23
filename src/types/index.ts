export interface Product {
  id: string
  title: string
  price: number
  description: string
  category: string
  brand: string
  image: string
  rating: number
}

export interface CartItem extends Product {
  quantity: number
}