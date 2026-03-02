"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart";
import ProductCard from "@/components/ProductCard";

function formatPrice(price: string | number) {
    return `Rs. ${Number(price).toLocaleString()}`;
}

export default function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
    const { addItem } = useCart();
    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);

    const hasDiscount = product.sale_price !== null;
    const effectivePrice = product.sale_price || product.price;
    const discountPercent = hasDiscount
        ? Math.round((1 - parseFloat(product.sale_price!) / parseFloat(product.price)) * 100)
        : 0;

    const handleAdd = () => {
        addItem(product, qty);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="pt-20 sm:pt-24">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <nav className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                    <Link href="/" className="hover:opacity-80 transition-opacity">Home</Link>
                    <span>/</span>
                    {product.category && (
                        <>
                            <Link href={`/category/${product.category.slug}`} className="hover:opacity-80 transition-opacity">
                                {product.category.name}
                            </Link>
                            <span>/</span>
                        </>
                    )}
                    <span style={{ color: "var(--gold)" }}>{product.name}</span>
                </nav>
            </div>

            {/* Product */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Image */}
                    <div className="aspect-square rounded-2xl overflow-hidden"
                        style={{ backgroundColor: "var(--charcoal)" }}>
                        <div className="w-full h-full flex items-center justify-center"
                            style={{ background: "linear-gradient(135deg, rgba(201,169,110,0.05), rgba(201,169,110,0.15))" }}>
                            <div className="text-center">
                                <svg className="w-24 h-24 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "var(--gold)" }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                                <span className="text-sm tracking-[0.15em] uppercase" style={{ color: "rgba(201,169,110,0.3)" }}>
                                    {product.name}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-center">
                        {product.category && (
                            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold-dark)" }}>
                                {product.category.name}
                            </p>
                        )}
                        <h1 className="text-3xl sm:text-4xl font-light tracking-wide mb-4"
                            style={{ fontFamily: "var(--font-cormorant)", color: "var(--cream)" }}>
                            {product.name}
                        </h1>

                        {/* Price */}
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-2xl font-light" style={{ color: "var(--gold)" }}>
                                {formatPrice(effectivePrice)}
                            </span>
                            {hasDiscount && (
                                <>
                                    <span className="text-lg line-through" style={{ color: "rgba(255,255,255,0.3)" }}>
                                        {formatPrice(product.price)}
                                    </span>
                                    <span className="px-2.5 py-1 rounded-md text-xs font-semibold"
                                        style={{ backgroundColor: "rgba(201,169,110,0.15)", color: "var(--gold)" }}>
                                        Save {discountPercent}%
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
                            {product.description}
                        </p>

                        {/* Stock status */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: product.stock > 0 ? "#22c55e" : "#ef4444" }} />
                            <span className="text-xs tracking-wide" style={{ color: "rgba(255,255,255,0.5)" }}>
                                {product.stock > 10 ? "In Stock" : product.stock > 0 ? `Only ${product.stock} left` : "Out of Stock"}
                            </span>
                        </div>

                        {/* SKU */}
                        {product.sku && (
                            <p className="text-xs mb-8" style={{ color: "rgba(255,255,255,0.25)" }}>
                                SKU: {product.sku}
                            </p>
                        )}

                        {/* Quantity + Add to Cart */}
                        {product.stock > 0 && (
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                                    <button onClick={() => setQty(Math.max(1, qty - 1))}
                                        className="w-12 h-12 flex items-center justify-center text-lg transition-colors"
                                        style={{ color: "var(--cream)", backgroundColor: "var(--charcoal)" }}>−</button>
                                    <span className="w-12 h-12 flex items-center justify-center text-sm"
                                        style={{ color: "var(--cream)", backgroundColor: "var(--charcoal)" }}>{qty}</span>
                                    <button onClick={() => setQty(Math.min(product.stock, qty + 1))}
                                        className="w-12 h-12 flex items-center justify-center text-lg transition-colors"
                                        style={{ color: "var(--cream)", backgroundColor: "var(--charcoal)" }}>+</button>
                                </div>
                                <button onClick={handleAdd}
                                    className="flex-1 py-4 rounded-xl text-xs font-medium tracking-[0.15em] uppercase transition-all duration-500"
                                    style={{
                                        background: added ? "linear-gradient(135deg, #22c55e, #16a34a)" : "linear-gradient(135deg, var(--gold-dark), var(--gold))",
                                        color: added ? "white" : "#0a0a0a",
                                        boxShadow: "0 4px 20px rgba(201,169,110,0.25)",
                                    }}>
                                    {added ? "✓ Added to Cart" : "Add to Cart"}
                                </button>
                            </div>
                        )}

                        {/* Features */}
                        <div className="grid grid-cols-3 gap-4 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                            {[
                                { icon: "🚚", label: "Free Shipping", sub: "Orders over Rs. 5,000" },
                                { icon: "🔒", label: "Secure Payment", sub: "100% protected" },
                                { icon: "↩️", label: "Easy Returns", sub: "7-day returns" },
                            ].map((f) => (
                                <div key={f.label} className="text-center">
                                    <span className="text-lg">{f.icon}</span>
                                    <p className="text-xs font-medium mt-1" style={{ color: "var(--cream)" }}>{f.label}</p>
                                    <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>{f.sub}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {related.length > 0 && (
                    <div className="mt-20 pt-16" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                        <h2 className="text-2xl font-light tracking-wide mb-10"
                            style={{ fontFamily: "var(--font-cormorant)", color: "var(--cream)" }}>
                            You May Also Like
                        </h2>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {related.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
