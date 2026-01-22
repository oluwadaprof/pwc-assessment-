import { Badge } from "@/src/primitives/ui/badge";
import type { Product } from "../../types/product";
import { formatCurrency } from "../../utils/vat-calculator";

type ProductListItemProps = {
    product: Product;
    isSelected: boolean;
    onSelect: () => void;
}

const getVatBadgeVariant = (vatRate: number, category: string) => {
    if (vatRate === 0) {
        return category === "Exempt" ? "secondary" : "outline";
    }
    return "default";
}

const getVatLabel = (vatRate: number, category: string) => {
    if (vatRate === 0) {
        return category === "Exempt" ? "Exempt" : "Zero-Rated";
    }
    return `${vatRate}% VAT`;
}

export const ProductListItem = ({ product, isSelected, onSelect }: ProductListItemProps) => {
    return (
        <div
            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-lg border bg-card cursor-pointer transition-all duration-200 hover:bg-secondary/50 hover:shadow-md gap-3 ${isSelected ? "ring-2 ring-primary border-primary" : "border-border"
                }`}
            onClick={onSelect}
        >

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-medium text-foreground">{product.name}</h3>
                    <Badge variant="secondary" className="text-xs shrink-0">
                        {product.category}
                    </Badge>
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
            </div>
        </div>
    );
}