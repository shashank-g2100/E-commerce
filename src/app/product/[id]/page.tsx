"use client"

import { useState } from "react"
import Image from "next/image"
import { Star } from 'lucide-react'
import { useCart } from "@/context/cart-context"
import { products } from "@/data/product"
import { notFound } from "next/navigation"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Section */}
        <div className="md:w-1/2">
          <div className="bg-white p-4 rounded-lg shadow">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              width={500}
              height={500}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < product.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
              />
            ))}
            <span className="ml-2 text-gray-600">({product.rating})</span>
          </div>
          <p className="text-2xl font-bold mb-4">${product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <div className="mb-4">
            <p className="font-medium mb-2">Category</p>
            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">{product.category}</span>
          </div>
          <div className="mb-6">
            <label htmlFor="quantity" className="block font-medium mb-2">
              Quantity
            </label>
            <div className="flex items-center">
              <button
                className="bg-gray-200 px-3 py-1 rounded-l"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                className="w-16 text-center border-y py-1"
                min="1"
              />
              <button className="bg-gray-200 px-3 py-1 rounded-r" onClick={() => setQuantity(quantity + 1)}>
                +
              </button>
            </div>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}