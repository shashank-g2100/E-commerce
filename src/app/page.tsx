import ProductGrid from "@/components/product-grid"
import Sidebar from "@/components/sidebar"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Product Listing</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 flex-shrink-0">
          <Sidebar />
        </div>
        <div className="flex-grow">
          <ProductGrid />
        </div>
      </div>
    </main>
  )
}