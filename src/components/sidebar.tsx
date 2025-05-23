"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function Sidebar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const didMount = useRef(false)

  const [category, setCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [brand, setBrand] = useState("all")
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    brand: true,
  })

  // Get initial values from URL only on first render
  useEffect(() => {
    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      setCategory(categoryParam)
    }

    const brandParam = searchParams.get("brand")
    if (brandParam) {
      setBrand(brandParam)
    }

    const priceParam = searchParams.get("price")
    if (priceParam) {
      const [min, max] = priceParam.split("-").map(Number)
      if (!isNaN(min) && !isNaN(max)) {
        setPriceRange([min, max])
      }
    }
  }, []) // Empty dependency array means this only runs once on mount

  // Update URL when filters change, but only when they're changed by user interaction
  useEffect(() => {
    // Skip the effect on initial render
    if (!didMount.current) {
      didMount.current = true
      return
    }

    const params = new URLSearchParams(searchParams.toString())

    if (category !== "all") {
      params.set("category", category)
    } else {
      params.delete("category")
    }

    if (brand !== "all") {
      params.set("brand", brand)
    } else {
      params.delete("brand")
    }

    params.set("price", `${priceRange[0]}-${priceRange[1]}`)

    // Use replace instead of push to avoid adding to history stack
    router.replace(`/?${params.toString()}`, { scroll: false })
  }, [category, priceRange, brand, router, searchParams])

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const clearFilters = () => {
    setCategory("all")
    setPriceRange([0, 1000])
    setBrand("all")
    router.replace("/")
  }

  return (
    <div className="bg-blue-600 text-white rounded-lg p-4 sticky top-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Filters</h2>
        <button onClick={clearFilters} className="text-sm hover:underline">
          Clear All
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => toggleSection("category")}
        >
          <h3 className="font-medium">Category</h3>
          {expandedSections.category ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>

        {expandedSections.category && (
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="all"
                name="category"
                value="all"
                checked={category === "all"}
                onChange={() => setCategory("all")}
                className="mr-2"
              />
              <label htmlFor="all" className="text-white cursor-pointer">
                All
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="electronics"
                name="category"
                value="electronics"
                checked={category === "electronics"}
                onChange={() => setCategory("electronics")}
                className="mr-2"
              />
              <label htmlFor="electronics" className="text-white cursor-pointer">
                Electronics
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="clothing"
                name="category"
                value="clothing"
                checked={category === "clothing"}
                onChange={() => setCategory("clothing")}
                className="mr-2"
              />
              <label htmlFor="clothing" className="text-white cursor-pointer">
                Clothing
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="home"
                name="category"
                value="home"
                checked={category === "home"}
                onChange={() => setCategory("home")}
                className="mr-2"
              />
              <label htmlFor="home" className="text-white cursor-pointer">
                Home
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <div className="flex justify-between items-center cursor-pointer mb-2" onClick={() => toggleSection("price")}>
          <h3 className="font-medium">Price</h3>
          {expandedSections.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>

        {expandedSections.price && (
          <>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
            <div className="flex justify-between text-sm">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </>
        )}
      </div>

      {/* Brand Filter */}
      <div>
        <div className="flex justify-between items-center cursor-pointer mb-2" onClick={() => toggleSection("brand")}>
          <h3 className="font-medium">Cacyroy</h3>
          {expandedSections.brand ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>

        {expandedSections.brand && (
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="brand-all"
                name="brand"
                value="all"
                checked={brand === "all"}
                onChange={() => setBrand("all")}
                className="mr-2"
              />
              <label htmlFor="brand-all" className="text-white cursor-pointer">
                All
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="brand-electronics"
                name="brand"
                value="electronics"
                checked={brand === "electronics"}
                onChange={() => setBrand("electronics")}
                className="mr-2"
              />
              <label htmlFor="brand-electronics" className="text-white cursor-pointer">
                Electronics
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="brand-clothing"
                name="brand"
                value="clothing"
                checked={brand === "clothing"}
                onChange={() => setBrand("clothing")}
                className="mr-2"
              />
              <label htmlFor="brand-clothing" className="text-white cursor-pointer">
                Clothing
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="brand-home"
                name="brand"
                value="home"
                checked={brand === "home"}
                onChange={() => setBrand("home")}
                className="mr-2"
              />
              <label htmlFor="brand-home" className="text-white cursor-pointer">
                Home
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}