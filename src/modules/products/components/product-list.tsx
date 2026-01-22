import { Badge } from "@/src/primitives/ui/badge"
import type { Product } from "../../types/product"
import { formatCurrency } from "../../utils/vat-calculator"
import { Sparkles, MoreVertical, Trash2 } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/src/primitives/ui/dropdown-menu"
import { Button } from "@/src/primitives/ui/button"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/src/primitives/ui/alert-dialog"
import { useCustomProductsStore } from "../../store/use-custom-product-store"
import { AddCustomProductDialog } from "./add-custom-product-dialog"

type ProductListItemProps = {
    product: Product
    isSelected: boolean
    onSelect: () => void
    categories: string[]
}

const getVatBadgeVariant = (vatRate: number, category: string) => {
    if (vatRate === 0) {
        return category === "Exempt" ? "secondary" : "outline"
    }
    return "default"
}

const getVatLabel = (vatRate: number, category: string) => {
    if (vatRate === 0) {
        return category === "Exempt" ? "Exempt" : "Zero-Rated"
    }
    return `${vatRate}% VAT`
}

export const ProductListItem = ({ product, isSelected, onSelect, categories }: ProductListItemProps) => {
    const isCustom = product.id.startsWith("custom-")
    const { deleteCustomProduct } = useCustomProductsStore()

    const handleDelete = () => {
        deleteCustomProduct(product.id)
    }

    return (
        <div
            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-lg border bg-card cursor-pointer transition-all duration-200 hover:bg-secondary/50 hover:shadow-md gap-3 relative ${isSelected ? "ring-2 ring-primary border-primary" : "border-border"
                }`}
            onClick={onSelect}
        >
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-medium text-foreground">{product.name}</h3>
                    {isCustom ? (
                        <Badge variant="secondary" className="gap-1 bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20">
                            <Sparkles className="h-3 w-3" />
                            Custom
                        </Badge>
                    ) : (
                        <Badge variant="secondary" className="text-xs shrink-0">
                            {product.category}
                        </Badge>
                    )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 sm:truncate">
                    {product.description}
                </p>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 sm:ml-4">
                <div className="flex items-center gap-2">
                    <Badge
                        variant={getVatBadgeVariant(product.vatRate, product.category)}
                        className="text-xs"
                    >
                        {getVatLabel(product.vatRate, product.category)}
                    </Badge>
                </div>
                <span className="text-lg font-semibold text-foreground whitespace-nowrap">
                    {formatCurrency(product.basePrice)}
                </span>
                {isCustom && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full shrink-0">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl" onClick={(e) => e.stopPropagation()}>
                            <div className="p-0.5">
                                <AddCustomProductDialog categories={categories} editProduct={product} />
                            </div>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive cursor-pointer text-sm py-1.5">
                                        <Trash2 className="h-3.5 w-3.5 mr-2" />
                                        Delete Service
                                    </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This will permanently delete "{product.name}" from your custom services. This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                                            Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </div>
    )
}