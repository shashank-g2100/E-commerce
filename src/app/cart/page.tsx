"use client"

import { useCart } from "@/context/cart-context"
import Image from "next/image"
import Link from "next/link"
import { Trash2, ArrowLeft, CreditCard, ShoppingBag } from "lucide-react"
import { useState } from "react"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponDiscount, setCouponDiscount] = useState(0)

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === "discount10") {
      setCouponApplied(true)
      setCouponDiscount(getCartTotal() * 0.1)
    } else {
      alert("Invalid coupon code")
    }
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="flex justify-center mb-6">
            <ShoppingBag className="h-16 w-16 text-gray-400" />
          </div>
          <p className="mb-8 text-gray-600">Your cart is empty</p>
          <Link href="/" className="btn-primary inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-semibold">Shopping Cart ({cart.length} items)</h2>
              <button onClick={clearCart} className="text-red-600 hover:text-red-800 text-sm">
                Clear Cart
              </button>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-16 w-16 flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            width={64}
                            height={64}
                            className="h-16 w-16 object-contain"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.title}</div>
                          <div className="text-xs text-gray-500">{item.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${item.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <button
                          className="bg-gray-200 px-2 py-1 rounded-l"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, Math.max(1, Number.parseInt(e.target.value) || 1))}
                          className="w-12 text-center border-y py-1"
                          min="1"
                        />
                        <button
                          className="bg-gray-200 px-2 py-1 rounded-r"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-between">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>

            {/* Coupon Code */}
            <div className="mb-4">
              <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-1">
                Coupon Code
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="coupon"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 border rounded-l px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  disabled={couponApplied}
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={couponApplied}
                  className={`px-4 py-2 rounded-r font-medium ${
                    couponApplied
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {couponApplied ? "Applied" : "Apply"}
                </button>
              </div>
              {couponApplied && <p className="text-green-600 text-sm mt-1">Coupon applied successfully!</p>}
            </div>

            <div className="flex justify-between py-2 border-b">
              <span>Subtotal</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>

            {couponApplied && (
              <div className="flex justify-between py-2 border-b text-green-600">
                <span>Discount (10%)</span>
                <span>-${couponDiscount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between py-2 border-b">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="flex justify-between py-2 border-b">
              <span>Tax</span>
              <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
            </div>

            <div className="flex justify-between py-2 font-bold text-lg mt-2">
              <span>Total</span>
              <span>${(getCartTotal() - couponDiscount + getCartTotal() * 0.08).toFixed(2)}</span>
            </div>

            <button className="btn-primary w-full mt-6 flex items-center justify-center">
              <CreditCard className="mr-2 h-5 w-5" />
              Proceed to Checkout
            </button>

            <div className="mt-4 text-xs text-gray-500 text-center">
              <p>Secure Checkout</p>
              <p className="mt-1">We accept all major credit cards</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
