"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

function formatPrice(n: number) {
    return `Rs. ${n.toLocaleString()}`;
}

export default function CartPage() {
    const { items, updateQty, removeItem, subtotal, itemCount } = useCart();

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-4">
                <svg className="w-16 h-16 mb-6 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "var(--gold)" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <h1 className="text-2xl font-light tracking-wide mb-3" style={{ fontFamily: "var(--font-cormorant)", color: "var(--cream)" }}>
                    Your Cart is Empty
                </h1>
                <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Discover our exquisite collection of fragrances
                </p>
                <Link href="/" className="px-8 py-3 rounded-xl text-xs font-medium tracking-[0.15em] uppercase"
                    style={{ backgroundColor: "var(--gold)", color: "#0a0a0a" }}>
                    Continue Shopping
                </Link>
            </div>
        );
    }

    const shipping = subtotal >= 5000 ? 0 : 500;
    const total = subtotal + shipping;

    return (
        <div className="pt-20 sm:pt-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-light tracking-wide mb-10"
                    style={{ fontFamily: "var(--font-cormorant)", color: "var(--cream)" }}>
                    Shopping Cart <span className="text-lg" style={{ color: "rgba(255,255,255,0.3)" }}>({itemCount})</span>
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => {
                            const price = parseFloat(item.product.sale_price || item.product.price);
                            return (
                                <div key={item.product.id} className="flex gap-4 p-4 rounded-xl"
                                    style={{ backgroundColor: "var(--charcoal)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                    {/* Image placeholder */}
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg flex-shrink-0 flex items-center justify-center"
                                        style={{ backgroundColor: "rgba(201,169,110,0.08)" }}>
                                        <svg className="w-8 h-8 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "var(--gold)" }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                    </div>
                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <Link href={`/product/${item.product.slug}`} className="text-sm font-medium hover:opacity-80 transition-opacity"
                                            style={{ color: "var(--cream)" }}>
                                            {item.product.name}
                                        </Link>
                                        <p className="text-xs mt-1" style={{ color: "var(--gold)" }}>{formatPrice(price)}</p>
                                        {/* Qty controls */}
                                        <div className="flex items-center gap-3 mt-3">
                                            <div className="flex items-center rounded-lg overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                                                <button onClick={() => updateQty(item.product.id, item.qty - 1)}
                                                    className="w-8 h-8 flex items-center justify-center text-xs"
                                                    style={{ color: "var(--cream)", backgroundColor: "rgba(255,255,255,0.03)" }}>−</button>
                                                <span className="w-8 h-8 flex items-center justify-center text-xs" style={{ color: "var(--cream)" }}>{item.qty}</span>
                                                <button onClick={() => updateQty(item.product.id, item.qty + 1)}
                                                    className="w-8 h-8 flex items-center justify-center text-xs"
                                                    style={{ color: "var(--cream)", backgroundColor: "rgba(255,255,255,0.03)" }}>+</button>
                                            </div>
                                            <button onClick={() => removeItem(item.product.id)} className="text-xs transition-colors" style={{ color: "rgba(255,255,255,0.3)" }}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    {/* Line total */}
                                    <div className="text-right">
                                        <span className="text-sm font-medium" style={{ color: "var(--cream)" }}>
                                            {formatPrice(price * item.qty)}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Summary */}
                    <div className="h-fit rounded-xl p-6" style={{ backgroundColor: "var(--charcoal)", border: "1px solid rgba(255,255,255,0.05)" }}>
                        <h2 className="text-lg font-light tracking-wide mb-6" style={{ fontFamily: "var(--font-cormorant)", color: "var(--cream)" }}>
                            Order Summary
                        </h2>
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                                <span style={{ color: "rgba(255,255,255,0.5)" }}>Subtotal</span>
                                <span style={{ color: "var(--cream)" }}>{formatPrice(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span style={{ color: "rgba(255,255,255,0.5)" }}>Shipping</span>
                                <span style={{ color: shipping === 0 ? "#22c55e" : "var(--cream)" }}>
                                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                                </span>
                            </div>
                            {shipping > 0 && (
                                <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                                    Free shipping on orders over Rs. 5,000
                                </p>
                            )}
                        </div>
                        <div className="flex justify-between text-base font-medium pt-4 mb-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                            <span style={{ color: "var(--cream)" }}>Total</span>
                            <span style={{ color: "var(--gold)" }}>{formatPrice(total)}</span>
                        </div>
                        <Link href="/checkout"
                            className="block w-full py-4 rounded-xl text-xs font-medium tracking-[0.15em] uppercase text-center transition-all duration-500"
                            style={{ background: "linear-gradient(135deg, var(--gold-dark), var(--gold))", color: "#0a0a0a", boxShadow: "0 4px 20px rgba(201,169,110,0.25)" }}>
                            Proceed to Checkout
                        </Link>
                        <Link href="/" className="block text-center mt-4 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
