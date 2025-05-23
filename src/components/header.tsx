"use client"

import Link from "next/link"
import { Search, ShoppingCart, User } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            Logo
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex relative flex-grow mx-8 max-w-md">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full py-2 px-4 pr-10 rounded text-black"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* Cart and Profile */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            <button>
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}