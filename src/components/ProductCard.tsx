"use client";

import Link from "next/link";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart";

function formatPrice(price: string | number) {
    return `Rs. ${Number(price).toLocaleString()}`;
}

export default function ProductCard({ product }: { product: Product }) {
    const { addItem } = useCart();
    const hasDiscount = product.sale_price !== null;
    const effectivePrice = product.sale_price || product.price;
    const discountPercent = hasDiscount
        ? Math.round((1 - parseFloat(product.sale_price!) / parseFloat(product.price)) * 100)
        : 0;

    return (
        <div className="group relative">
            {/* Image placeholder */}
            <Link href={`/product/${product.slug}`}>
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 transition-all duration-500"
                    style={{ backgroundColor: "var(--charcoal)" }}>
                    {/* Gradient placeholder for product image */}
                    <div className="absolute inset-0 flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, rgba(201,169,110,0.05), rgba(201,169,110,0.15))" }}>
                        <div className="text-center">
                            <svg className="w-12 h-12 mx-auto mb-2 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "var(--gold)" }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                            <span className="text-xs tracking-[0.15em] uppercase" style={{ color: "rgba(201,169,110,0.3)" }}>
                                {product.name.split(' ').pop()}
                            </span>
                        </div>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-4"
                        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}>
                        <button
                            onClick={(e) => { e.preventDefault(); addItem(product); }}
                            className="w-full py-3 rounded-lg text-xs font-medium tracking-[0.15em] uppercase transition-all duration-300"
                            style={{ backgroundColor: "var(--gold)", color: "#0a0a0a" }}>
                            Add to Cart
                        </button>
                    </div>

                    {/* Badges */}
                    {hasDiscount && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-wider"
                            style={{ backgroundColor: "var(--gold)", color: "#0a0a0a" }}>
                            -{discountPercent}%
                        </span>
                    )}
                    {product.stock <= 5 && product.stock > 0 && (
                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[10px] font-medium tracking-wider"
                            style={{ backgroundColor: "rgba(220,38,38,0.9)", color: "white" }}>
                            Low Stock
                        </span>
                    )}
                    {product.stock === 0 && (
                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[10px] font-medium tracking-wider"
                            style={{ backgroundColor: "rgba(100,100,100,0.9)", color: "white" }}>
                            Sold Out
                        </span>
                    )}
                </div>
            </Link>

            {/* Info */}
            <div className="space-y-1.5">
                {product.category && (
                    <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--gold-dark)" }}>
                        {product.category.name}
                    </p>
                )}
                <Link href={`/product/${product.slug}`}>
                    <h3 className="text-sm font-medium tracking-wide group-hover:opacity-80 transition-opacity" style={{ color: "var(--cream)" }}>
                        {product.name}
                    </h3>
                </Link>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium" style={{ color: "var(--gold)" }}>
                        {formatPrice(effectivePrice)}
                    </span>
                    {hasDiscount && (
                        <span className="text-xs line-through" style={{ color: "rgba(255,255,255,0.3)" }}>
                            {formatPrice(product.price)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
