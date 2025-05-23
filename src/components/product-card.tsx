"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import type { Product } from "@/types"
import { Star, ShoppingCart, Eye } from "lucide-react"

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({ ...product, quantity: 1 })
  }

  return (
    <div
      className="bg-white rounded-lg shadow overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`}>
        <div className="p-4">
          <div className="aspect-square relative mb-4 overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              fill
              className={`object-contain transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
            />
          </div>
          <h3 className="font-medium text-gray-900 mb-1 truncate">{product.title}</h3>
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < product.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>
          <p className="font-bold text-lg mb-4">${product.price}</p>
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded flex items-center justify-center"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </button>
            <Link
              href={`/product/${product.id}`}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-3 rounded"
              onClick={(e) => e.stopPropagation()}
            >
              <Eye className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Link>
    </div>
  )
}
