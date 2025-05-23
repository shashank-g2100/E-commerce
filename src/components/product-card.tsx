"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/app/context/cart-context"
import type { Product } from "@/types"
import { Star } from 'lucide-react'

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({ ...product, quantity: 1 })
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <Link href={`/product/${product.id}`}>
        <div className="p-4">
          <div className="aspect-square relative mb-4">
            <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-contain" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">{product.title}</h3>
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
          <button onClick={handleAddToCart} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
            Add to Cart
          </button>
        </div>
      </Link>
    </div>
  )
}