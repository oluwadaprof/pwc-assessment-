'use client'

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";




import { fetchProducts } from "../lib/api/product";
import { Card, CardContent, CardHeader, CardTitle } from "../primitives/ui/card";
import { SearchBar } from "../modules/layout/components/search-bar";
import { Header } from "../modules/layout/components/header";
import { ProductGrid } from "../modules/products/components/product-grid";

import { CartSummary } from "../modules/cart/components/cart-summary";
import { ViewToggle } from "../modules/layout/components/view-toggle";
import { AddToCartForm } from "../modules/cart/components/add-to-cart";
import { CategoryFilter } from "../modules/cart/components/cartegory-filter";


const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [cartOpen, setCartOpen] = useState(false);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return Array.from(cats).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const handleProductSelect = (id: string) => {
    setSelectedProductId(id);
    setCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        resultCount={filteredProducts.length}
        view={view}
        onViewChange={setView}
        products={products}
        selectedProductId={selectedProductId}
        onProductSelect={setSelectedProductId}
        cartOpen={cartOpen}
        onCartOpenChange={setCartOpen}
      />

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            <div className="md:hidden">
              <ViewToggle view={view} onViewChange={setView} />
            </div>
          </div>

          <ProductGrid
            products={filteredProducts}
            selectedProductId={selectedProductId}
            onSelectProduct={handleProductSelect}
            isLoading={isLoading}
            view={view}
            searchQuery={searchQuery}
          />
        </div>
      </main>
    </div>
  );
}


export default Index;