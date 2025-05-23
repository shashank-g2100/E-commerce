import { NextResponse } from "next/server"
import { products } from "@/data/product"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")?.toLowerCase() || ""
  const category = searchParams.get("category")
  const brand = searchParams.get("brand")
  const minPrice = Number(searchParams.get("minPrice") || 0)
  const maxPrice = Number(searchParams.get("maxPrice") || Number.POSITIVE_INFINITY)

  const filteredProducts = products.filter((product) => {
    // Filter by search query
    if (query && !product.title.toLowerCase().includes(query) && !product.description.toLowerCase().includes(query)) {
      return false
    }

    // Filter by category
    if (category && category !== "all" && product.category !== category) {
      return false
    }

    // Filter by brand
    if (brand && brand !== "all" && product.brand !== brand) {
      return false
    }

    // Filter by price range
    if (product.price < minPrice || product.price > maxPrice) {
      return false
    }

    return true
  })

  // Simulate network delay for loading state demonstration
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json(filteredProducts)
}
