"use client";

import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/types";

export default function HomeProducts({ products }: { products: Product[] }) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
