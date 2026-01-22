'use client'

import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchProducts } from "../lib/api/product"
import { Header } from "../modules/layout/components/header"
import { ProductGrid } from "../modules/products/components/product-grid"
import { CategoryFilter } from "../modules/cart/components/cartegory-filter"
import { useCustomProductsStore } from "../modules/store/use-custom-product-store"


const Index = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [view, setView] = useState<"grid" | "list">("grid")
  const [cartOpen, setCartOpen] = useState(false)

  const { data: mockProducts = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  })

  const { customProducts } = useCustomProductsStore()

  const allProducts = useMemo(() => {
    return [...mockProducts, ...customProducts]
  }, [mockProducts, customProducts])

  const categories = useMemo(() => {
    const cats = new Set(allProducts.map((p) => p.category))
    return Array.from(cats).sort()
  }, [allProducts])

  const filteredProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !selectedCategory || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    return filtered.sort((a, b) => {
      const aIsCustom = a.id.startsWith("custom-")
      const bIsCustom = b.id.startsWith("custom-")

      if (aIsCustom && !bIsCustom) return -1
      if (!aIsCustom && bIsCustom) return 1
      return 0
    })
  }, [allProducts, searchQuery, selectedCategory])

  const handleProductSelect = (id: string) => {
    setSelectedProductId(id)
    setCartOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        resultCount={filteredProducts.length}
        view={view}
        onViewChange={setView}
        products={allProducts}
        selectedProductId={selectedProductId}
        onProductSelect={setSelectedProductId}
        cartOpen={cartOpen}
        onCartOpenChange={setCartOpen}
        categories={categories}
      />

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          <ProductGrid
            products={filteredProducts}
            selectedProductId={selectedProductId}
            onSelectProduct={handleProductSelect}
            isLoading={isLoading}
            view={view}
            searchQuery={searchQuery}
            categories={categories}
          />
        </div>
      </main>
    </div>
  )
}

export default Index