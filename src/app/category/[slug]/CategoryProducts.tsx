"use client";

import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/types";

export default function CategoryProducts({ products }: { products: Product[] }) {
    if (products.length === 0) {
        return (
            <div className="text-center py-20">
                <p style={{ color: "rgba(255,255,255,0.4)" }}>No products in this category yet.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
