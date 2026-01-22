import { Product } from "../../types/product"
import { ProductCard } from "./product-card"
import { Loader2 } from "lucide-react"

type ProductGridProps = {
    products: Product[]
    selectedProductId: string | null
    onSelectProduct: (id: string) => void
    isLoading: boolean
    view: "grid" | "list"
    searchQuery: string
    categories: string[]
}

export const ProductGrid = ({
    products,
    selectedProductId,
    onSelectProduct,
    isLoading,
    view,
    searchQuery,
    categories,
}: ProductGridProps) => {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">
                    {searchQuery ? "No products found matching your search." : "No products available."}
                </p>
            </div>
        )
    }

    return (
        <div
            className={
                view === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    : "flex flex-col gap-3"
            }
        >
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    isSelected={selectedProductId === product.id}
                    onSelect={() => onSelectProduct(product.id)}
                    categories={categories}
                />
            ))}
        </div>
    )
}