"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import ProductCard from "./product-card"
import type { Product } from "@/types"
import { Loader2 } from "lucide-react"
import Link from "next/link"

export default function ProductGrid() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const category = searchParams.get("category")
  const brand = searchParams.get("brand")
  const price = searchParams.get("price")
  const query = searchParams.get("q")

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)

      try {
        // Build query string from search params
        const params = new URLSearchParams()
        if (category) params.set("category", category)
        if (brand) params.set("brand", brand)
        if (price) {
          const [min, max] = price.split("-")
          params.set("minPrice", min)
          params.set("maxPrice", max)
        }
        if (query) params.set("q", query)

        const response = await fetch(`/api/search?${params.toString()}`)

        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }

        const data = await response.json()
        setProducts(data)
      } catch (err) {
        console.error("Error fetching products:", err)
        setError("Failed to load products. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category, brand, price, query])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
        <span className="ml-2 text-lg">Loading products...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="btn-primary">
          Try Again
        </button>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow p-8">
        <h2 className="text-xl font-semibold mb-2">No products found</h2>
        <p className="text-gray-600 mb-6">Try adjusting your filters or search term</p>
        <Link href="/" className="btn-primary">
          Clear Filters
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
