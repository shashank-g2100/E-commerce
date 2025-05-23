"use client"

import Link from "next/link"
import { ShoppingCart, User, Menu } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useState } from "react"
import SearchBar from "./search-bar"

export default function Header() {
  const { cart } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="bg-blue-600 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            Logo
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-grow mx-8">
            <SearchBar />
          </div>

          {/* Cart and Profile */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button>
              <User className="h-6 w-6" />
            </button>
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-3 md:hidden">
          <SearchBar />
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 py-2 border-t border-blue-500">
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/?category=electronics"
                    className="block py-1 hover:bg-blue-700 px-2 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link
                    href="/?category=clothing"
                    className="block py-1 hover:bg-blue-700 px-2 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Clothing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/?category=home"
                    className="block py-1 hover:bg-blue-700 px-2 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
