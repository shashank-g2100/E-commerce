import type { Product } from "@/types"

export const products: Product[] = [
  {
    id: "1",
    title: "Running Shoes",
    price: 99,
    description: "Comfortable running shoes with excellent cushioning and support for all your running needs.",
    category: "clothing",
    brand: "Nike",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4,
  },
  {
    id: "2",
    title: "Wireless Headphones",
    price: 149,
    description: "High-quality wireless headphones with noise cancellation and long battery life.",
    category: "electronics",
    brand: "Sony",
    image: "/placeholder.svg?height=200&width=200",
    rating: 5,
  },
  // Add more products...
]