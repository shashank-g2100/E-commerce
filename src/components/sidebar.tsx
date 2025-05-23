"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"
import { Slider } from "./ui/slider"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function Sidebar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const didMount = useRef(false)

  const [category, setCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [brand, setBrand] = useState("all")
  const [priceInput, setPriceInput] = useState("5000")
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

  const handleCategoryChange = (value: string) => {
    setCategory(value)
  }

  const handleBrandChange = (value: string) => {
    setBrand(value)
  }

  const handlePriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceInput(e.target.value)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Filters Section */}
      <div className="bg-blue-600 text-white rounded-lg p-4">
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
            <RadioGroup value={category} onValueChange={handleCategoryChange}>
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="all" id="all" className="border-white text-white" />
                <Label htmlFor="all" className="text-white cursor-pointer">
                  All
                </Label>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="electronics" id="electronics" className="border-white text-white" />
                <Label htmlFor="electronics" className="text-white cursor-pointer">
                  Electronics
                </Label>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="clothing" id="clothing" className="border-white text-white" />
                <Label htmlFor="clothing" className="text-white cursor-pointer">
                  Clothing
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="home" id="home" className="border-white text-white" />
                <Label htmlFor="home" className="text-white cursor-pointer">
                  Home
                </Label>
              </div>
            </RadioGroup>
          )}
        </div>

        {/* Price Range Slider */}
        <div>
          <div className="flex justify-between items-center cursor-pointer mb-2" onClick={() => toggleSection("price")}>
            <h3 className="font-medium">Price</h3>
            {expandedSections.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>

          {expandedSections.price && (
            <>
              <Slider
                defaultValue={[0, 1000]}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
                className="my-4"
              />
              <div className="flex justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Cacyroy Section - Styled to match the image */}
      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="font-medium text-gray-900 mb-3">Cacyroy</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="brand-all"
              name="brand"
              value="all"
              checked={brand === "all"}
              onChange={() => handleBrandChange("all")}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="brand-all" className="ml-2 text-sm text-gray-700">
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
              onChange={() => handleBrandChange("electronics")}
              className="w-4 h-4 text-gray-400 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="brand-electronics" className="ml-2 text-sm text-gray-700">
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
              onChange={() => handleBrandChange("clothing")}
              className="w-4 h-4 text-gray-400 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="brand-clothing" className="ml-2 text-sm text-gray-700">
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
              onChange={() => handleBrandChange("home")}
              className="w-4 h-4 text-gray-400 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="brand-home" className="ml-2 text-sm text-gray-700">
              Home
            </label>
          </div>
        </div>

        {/* Price Input Field */}
        <div className="mt-4">
          <h3 className="font-medium text-gray-900 mb-2">Price</h3>
          <div className="relative">
            <input
              type="text"
              value={priceInput}
              onChange={handlePriceInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {/* <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">:</span> */}
          </div>
        </div>
      </div>
    </div>
  )
}
