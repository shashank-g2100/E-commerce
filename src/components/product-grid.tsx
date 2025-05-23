"use client"

import { useSearchParams } from "next/navigation"
import ProductCard from "./product-card"
import { products } from "@/data/product"

export default function ProductGrid() {
  const searchParams = useSearchParams()

  const category = searchParams.get("category")
  const brand = searchParams.get("brand")
  const priceRange = searchParams.get("price")?.split("-").map(Number) || [0, Number.POSITIVE_INFINITY]
  const query = searchParams.get("q")?.toLowerCase()

  const filteredProducts = products.filter((product) => {
    // Filter by category
    if (category && category !== "all" && product.category !== category) {
      return false
    }

    // Filter by brand
    if (brand && brand !== "all" && product.brand !== brand) {
      return false
    }

    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false
    }

    // Filter by search query
    if (query && !product.title.toLowerCase().includes(query)) {
      return false
    }

    return true
  })

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">No products found</h2>
        <p className="text-gray-600">Try adjusting your filters or search term</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}