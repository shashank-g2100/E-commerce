import { Suspense } from "react"
import ProductGrid from "@/components/product-grid"
import Sidebar from "@/components/sidebar"
import { Loader2 } from "lucide-react"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 flex-shrink-0">
          <Suspense fallback={<SidebarSkeleton />}>
            <Sidebar />
          </Suspense>
        </div>
        <div className="flex-grow">
          <h1 className="text-2xl font-bold mb-6">Product Listing</h1>
          <Suspense
            fallback={
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
                <span className="ml-2 text-lg">Loading products...</span>
              </div>
            }
          >
            <ProductGrid />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

function SidebarSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-blue-400 text-white rounded-lg p-4 opacity-70">
        <div className="h-7 bg-blue-300 rounded w-24 mb-4"></div>
        <div className="space-y-3">
          <div className="h-5 bg-blue-300 rounded w-full"></div>
          <div className="h-5 bg-blue-300 rounded w-full"></div>
          <div className="h-5 bg-blue-300 rounded w-full"></div>
          <div className="h-5 bg-blue-300 rounded w-full"></div>
        </div>
      </div>
      <div className="mt-4 bg-gray-200 rounded-lg p-4">
        <div className="h-5 bg-gray-300 rounded w-24 mb-3"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
        </div>
        <div className="mt-4">
          <div className="h-5 bg-gray-300 rounded w-24 mb-2"></div>
          <div className="h-10 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    </div>
  )
}
