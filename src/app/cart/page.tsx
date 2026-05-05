"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Plus, Minus, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { C, container } from "@/styles/constants";

function formatPrice(n: number) {
    return `Rs. ${n.toLocaleString()}`;
}

export default function CartPage() {
    const { items, updateQty, removeItem, subtotal, itemCount } = useCart();

    if (items.length === 0) {
        return (
            <section style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px", gap: 16, backgroundColor: C.bg, textAlign: "center" }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", border: `1px solid ${C.gold}`, display: "flex", alignItems: "center", justifyContent: "center", color: C.gold }}>
                    <ShoppingBag size={28} strokeWidth={1.4} />
                </div>
                <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 32, fontWeight: 300, color: C.text, letterSpacing: "0.04em", margin: 0 }}>
                    Your Cart is Empty
                </h1>
                <p style={{ color: C.textMuted, fontSize: 14, marginBottom: 12 }}>
                    Discover our exquisite collection of fragrances.
                </p>
                <Link href="/shop" className="btn-gold" style={{ backgroundColor: C.gold, color: "#fff", padding: "14px 32px", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none", transition: "background-color 0.3s" }}>
                    Continue Shopping
                </Link>
            </section>
        );
    }

    const shipping = subtotal >= 5000 ? 0 : 500;
    const total = subtotal + shipping;

    return (
        <section style={{ paddingBlock: 64, backgroundColor: C.bg }}>
            <div style={container}>
                <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 36, fontWeight: 300, color: C.text, letterSpacing: "0.04em", margin: 0, marginBottom: 32 }}>
                    Shopping Cart <span style={{ color: C.textLight, fontSize: 18 }}>({itemCount})</span>
                </h1>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 40 }} className="lg-grid-2 sm-full">
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {items.map((item) => {
                            const price = parseFloat(item.product.sale_price ?? item.product.price);
                            const img = item.product.images?.[0];
                            return (
                                <div key={item.product.id} style={{ display: "flex", gap: 16, padding: 16, border: `1px solid ${C.borderLight}`, backgroundColor: "#fff" }}>
                                    <div style={{ width: 100, height: 130, position: "relative", backgroundColor: C.bgAlt, flexShrink: 0 }}>
                                        {img && <Image src={img} alt={item.product.name} fill style={{ objectFit: "cover" }} sizes="100px" />}
                                    </div>
                                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0 }}>
                                        <div>
                                            <Link href={`/product/${item.product.slug}`} className="text-hover" style={{ color: C.text, fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none", fontFamily: "var(--font-playfair), Georgia, serif" }}>
                                                {item.product.name}
                                            </Link>
                                            <p style={{ color: C.gold, fontSize: 13, marginTop: 4, fontWeight: 600 }}>{formatPrice(price)}</p>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <div style={{ display: "flex", alignItems: "center", border: `1px solid ${C.border}` }}>
                                                <button onClick={() => updateQty(item.product.id, item.qty - 1)} style={{ width: 32, height: 32, background: "none", border: "none", cursor: "pointer", color: C.text, display: "flex", alignItems: "center", justifyContent: "center" }}><Minus size={12} /></button>
                                                <span style={{ minWidth: 32, textAlign: "center", fontSize: 13, color: C.text }}>{item.qty}</span>
                                                <button onClick={() => updateQty(item.product.id, item.qty + 1)} style={{ width: 32, height: 32, background: "none", border: "none", cursor: "pointer", color: C.text, display: "flex", alignItems: "center", justifyContent: "center" }}><Plus size={12} /></button>
                                            </div>
                                            <button onClick={() => removeItem(item.product.id)} className="icon-hover" style={{ background: "none", border: "none", cursor: "pointer", color: C.textLight, display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
                                                <X size={14} /> Remove
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{ minWidth: 100, textAlign: "right" }}>
                                        <span style={{ color: C.text, fontSize: 14, fontWeight: 500 }}>{formatPrice(price * item.qty)}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <aside style={{ alignSelf: "start", backgroundColor: C.bgAlt, padding: 28, border: `1px solid ${C.borderLight}` }}>
                        <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 22, fontWeight: 300, color: C.text, letterSpacing: "0.04em", marginTop: 0, marginBottom: 20 }}>
                            Order Summary
                        </h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                                <span style={{ color: C.textMuted }}>Subtotal</span>
                                <span style={{ color: C.text }}>{formatPrice(subtotal)}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                                <span style={{ color: C.textMuted }}>Shipping</span>
                                <span style={{ color: shipping === 0 ? "#22c55e" : C.text }}>
                                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                                </span>
                            </div>
                            {shipping > 0 && (
                                <p style={{ color: C.textLight, fontSize: 11, margin: 0 }}>Free shipping on orders over Rs. 5,000</p>
                            )}
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 16, borderTop: `1px solid ${C.border}`, marginBottom: 20 }}>
                            <span style={{ fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: C.text }}>Total</span>
                            <span style={{ color: C.gold, fontSize: 20, fontWeight: 600 }}>{formatPrice(total)}</span>
                        </div>
                        <Link href="/checkout" className="btn-gold" style={{ display: "block", textAlign: "center", backgroundColor: C.gold, color: "#fff", padding: "14px 0", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none", transition: "background-color 0.3s" }}>
                            Proceed to Checkout
                        </Link>
                        <Link href="/shop" className="text-hover" style={{ display: "block", textAlign: "center", marginTop: 12, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: C.textMuted, textDecoration: "none" }}>
                            Continue Shopping
                        </Link>
                    </aside>
                </div>
            </div>
        </section>
    );
}
