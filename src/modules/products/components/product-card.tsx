import { Product } from "../../types/product"
import { formatCurrency } from "../../utils/vat-calculator"
import { Badge } from "@/src/primitives/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/primitives/ui/card"
import { Sparkles, MoreVertical, Pencil, Trash2 } from "lucide-react"
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

type ProductCardProps = {
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

export const ProductCard = ({ product, isSelected, onSelect, categories }: ProductCardProps) => {
    const isCustom = product.id.startsWith("custom-")
    const { deleteCustomProduct } = useCustomProductsStore()

    const handleDelete = () => {
        deleteCustomProduct(product.id)
    }

    return (
        <Card
            className={`cursor-pointer transition-all duration-200 hover:bg-secondary/50 hover:shadow-lg flex flex-col h-full rounded-2xl relative ${isSelected ? "ring-0 ring-primary border-primary" : "border-border"
                }`}
            onClick={onSelect}
        >
            {isCustom && (
                <div className="absolute top-3 right-3 z-10 flex items-center gap-2">

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" className="h-7 w-7 mt-2 rounded-full">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="rounded-xl p-2" align="end" onClick={(e) => e.stopPropagation()}>
                            <AddCustomProductDialog categories={categories} editProduct={product} />
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive h-7 cursor-pointer">
                                        <Trash2 className="h-4 w-4 " />
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
                </div>
            )}

            <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                    <CardTitle className={`text-base font-medium leading-tight ${isCustom ? "pr-20" : ""}`}>
                        {product.name}
                    </CardTitle>
                    {!isCustom && (
                        <Badge variant="secondary" className="text-xs shrink-0">
                            {product.category}
                        </Badge>
                    )}
                </div>
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
                <p className="mb-4 text-sm text-muted-foreground line-clamp-2 flex-1">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-semibold text-foreground">
                        {formatCurrency(product.basePrice)}
                    </span>
                    <Badge variant={getVatBadgeVariant(product.vatRate, product.category)} className="text-xs">
                        {getVatLabel(product.vatRate, product.category)}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    )
}