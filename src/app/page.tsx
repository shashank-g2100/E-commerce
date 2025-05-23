import { Suspense } from "react"
import ProductGrid from "@/components/product-grid"
import Sidebar from "@/components/sidebar"
import { Loader2 } from "lucide-react"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 flex-shrink-0">
          <Sidebar />
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
