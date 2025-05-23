"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { useDebounce } from "@/hooks/use-debounce"

export default function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (debouncedQuery) {
      router.push(`/?q=${encodeURIComponent(debouncedQuery)}`)
    }
  }, [debouncedQuery, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query)}`)
    }
  }

  const clearSearch = () => {
    setQuery("")
    router.push("/")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex-grow max-w-md">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
        className="w-full py-2 px-4 pr-10 rounded text-black transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center">
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="text-gray-500 hover:text-gray-700 mr-1"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <button type="submit" className="text-gray-500 hover:text-gray-700" aria-label="Search">
          <Search className="h-5 w-5" />
        </button>
      </div>
    </form>
  )
}
