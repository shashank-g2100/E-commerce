"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RefreshCw } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { products } from "@/data/product"
import { notFound } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductCard from "@/components/product-card" // Import ProductCard component

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addToCart } = useCart()

  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  // Simulate multiple product images
  const productImages = [
    product.image,
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
  ]

  const handleAddToCart = () => {
    addToCart({ ...product, quantity })
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  // Related products (products in the same category)
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center mb-6 text-sm">
        <Link href="/" className="text-gray-500 hover:text-blue-600">
          Home
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link href={`/?category=${product.category}`} className="text-gray-500 hover:text-blue-600">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-700">{product.title}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Image Section */}
        <div className="md:w-1/2">
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <div className="aspect-square relative">
              <Image
                src={productImages[selectedImage] || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`border-2 rounded p-1 ${selectedImage === index ? "border-blue-600" : "border-gray-200"}`}
              >
                <div className="relative w-16 h-16">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.title} thumbnail ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </button>
            ))}
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

          <div className="flex gap-4 mb-6">
            <button className="flex-1 btn-primary flex items-center justify-center" onClick={handleAddToCart}>
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </button>
            <button
              className={`p-3 rounded border ${
                isWishlisted ? "bg-red-50 border-red-200 text-red-500" : "bg-gray-50 border-gray-200 text-gray-700"
              }`}
              onClick={toggleWishlist}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
            </button>
            <button className="p-3 rounded bg-gray-50 border border-gray-200 text-gray-700">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3 border-t pt-4">
            <div className="flex items-center text-sm text-gray-600">
              <Truck className="w-4 h-4 mr-2 text-green-600" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Shield className="w-4 h-4 mr-2 text-green-600" />
              <span>2-year warranty included</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <RefreshCw className="w-4 h-4 mr-2 text-green-600" />
              <span>30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mb-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full border-b">
            <TabsTrigger value="description" className="flex-1">
              Description
            </TabsTrigger>
            <TabsTrigger value="specifications" className="flex-1">
              Specifications
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex-1">
              Reviews
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="p-4 bg-white rounded-b-lg shadow">
            <p className="text-gray-700">{product.description}</p>
            <p className="text-gray-700 mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed
              erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
              Phasellus molestie magna non est bibendum non venenatis nisl tempor.
            </p>
          </TabsContent>
          <TabsContent value="specifications" className="p-4 bg-white rounded-b-lg shadow">
            <table className="w-full text-left">
              <tbody>
                <tr className="border-b">
                  <th className="py-2 pr-4 font-medium text-gray-600">Brand</th>
                  <td className="py-2">{product.brand}</td>
                </tr>
                <tr className="border-b">
                  <th className="py-2 pr-4 font-medium text-gray-600">Category</th>
                  <td className="py-2">{product.category}</td>
                </tr>
                <tr className="border-b">
                  <th className="py-2 pr-4 font-medium text-gray-600">Weight</th>
                  <td className="py-2">0.5 kg</td>
                </tr>
                <tr className="border-b">
                  <th className="py-2 pr-4 font-medium text-gray-600">Dimensions</th>
                  <td className="py-2">10 × 10 × 10 cm</td>
                </tr>
                <tr>
                  <th className="py-2 pr-4 font-medium text-gray-600">Color</th>
                  <td className="py-2">Black</td>
                </tr>
              </tbody>
            </table>
          </TabsContent>
          <TabsContent value="reviews" className="p-4 bg-white rounded-b-lg shadow">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Customer Reviews</h3>
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < product.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">Based on 24 reviews</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < 5 ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">John Doe</span>
                  <span className="mx-2">•</span>
                  <span className="text-gray-500 text-sm">2 weeks ago</span>
                </div>
                <p className="text-gray-700">
                  Great product! Exactly as described and arrived quickly. Would definitely recommend.
                </p>
              </div>

              <div className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">Jane Smith</span>
                  <span className="mx-2">•</span>
                  <span className="text-gray-500 text-sm">1 month ago</span>
                </div>
                <p className="text-gray-700">
                  Good quality for the price. Shipping was a bit slow but the product is worth the wait.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
