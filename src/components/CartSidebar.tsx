"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { C } from "@/styles/constants";

export default function CartSidebar() {
    const { isCartOpen, setIsCartOpen, items, removeItem, updateQty, subtotal } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setIsCartOpen(false)}
                        style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.55)", zIndex: 998 }}
                    />
                    <motion.aside
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
                        style={{
                            position: "fixed",
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: "min(420px, 100%)",
                            backgroundColor: "#fff",
                            zIndex: 999,
                            display: "flex",
                            flexDirection: "column",
                            boxShadow: "-4px 0 32px rgba(0,0,0,0.15)",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: `1px solid ${C.borderLight}` }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <ShoppingBag size={18} style={{ color: C.gold }} strokeWidth={1.5} />
                                <span style={{ fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: C.text }}>
                                    Shopping Cart ({items.length})
                                </span>
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                style={{ background: "none", border: "none", cursor: "pointer", color: C.text }}
                                aria-label="Close cart"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        <div style={{ flex: 1, overflowY: "auto", padding: items.length === 0 ? 0 : "16px 24px" }}>
                            {items.length === 0 ? (
                                <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center", gap: 16 }}>
                                    <div style={{ width: 64, height: 64, borderRadius: "50%", border: `1px solid ${C.borderLight}`, display: "flex", alignItems: "center", justifyContent: "center", color: C.gold }}>
                                        <ShoppingBag size={26} strokeWidth={1.4} />
                                    </div>
                                    <p style={{ color: C.textMuted, fontSize: 14, margin: 0 }}>Your cart is empty</p>
                                    <Link
                                        href="/shop"
                                        onClick={() => setIsCartOpen(false)}
                                        className="btn-gold"
                                        style={{
                                            backgroundColor: C.gold,
                                            color: C.white,
                                            padding: "12px 28px",
                                            fontSize: 11,
                                            letterSpacing: "0.2em",
                                            textTransform: "uppercase",
                                            textDecoration: "none",
                                            transition: "background-color 0.3s",
                                        }}
                                    >
                                        Browse Collection
                                    </Link>
                                </div>
                            ) : (
                                items.map((item) => {
                                    const unit = parseFloat(item.product.sale_price ?? item.product.price);
                                    const img = item.product.images?.[0];
                                    return (
                                        <div key={item.product.id} style={{ display: "flex", gap: 16, paddingBlock: 16, borderBottom: `1px solid ${C.borderLight}` }}>
                                            <div style={{ width: 84, height: 110, position: "relative", backgroundColor: C.bgAlt, flexShrink: 0 }}>
                                                {img && <Image src={img} alt={item.product.name} fill style={{ objectFit: "cover" }} sizes="84px" />}
                                            </div>
                                            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                                <div>
                                                    <Link href={`/product/${item.product.slug}`} onClick={() => setIsCartOpen(false)} style={{ color: C.text, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none" }}>
                                                        {item.product.name}
                                                    </Link>
                                                    <p style={{ color: C.gold, fontSize: 13, marginTop: 4, fontWeight: 600 }}>Rs. {(unit * item.qty).toLocaleString()}</p>
                                                </div>
                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                    <div style={{ display: "flex", alignItems: "center", border: `1px solid ${C.border}` }}>
                                                        <button
                                                            onClick={() => updateQty(item.product.id, item.qty - 1)}
                                                            style={{ width: 28, height: 28, background: "none", border: "none", cursor: "pointer", color: C.text, display: "flex", alignItems: "center", justifyContent: "center" }}
                                                            aria-label="Decrease"
                                                        >
                                                            <Minus size={12} />
                                                        </button>
                                                        <span style={{ minWidth: 24, textAlign: "center", fontSize: 12, color: C.text }}>{item.qty}</span>
                                                        <button
                                                            onClick={() => updateQty(item.product.id, item.qty + 1)}
                                                            style={{ width: 28, height: 28, background: "none", border: "none", cursor: "pointer", color: C.text, display: "flex", alignItems: "center", justifyContent: "center" }}
                                                            aria-label="Increase"
                                                        >
                                                            <Plus size={12} />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item.product.id)}
                                                        style={{ background: "none", border: "none", cursor: "pointer", color: C.textLight, display: "flex", alignItems: "center" }}
                                                        aria-label="Remove"
                                                        className="icon-hover"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        {items.length > 0 && (
                            <div style={{ borderTop: `1px solid ${C.borderLight}`, padding: 24, backgroundColor: C.bgAlt }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                                    <span style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: C.text }}>Subtotal</span>
                                    <span style={{ color: C.gold, fontSize: 18, fontWeight: 600 }}>Rs. {subtotal.toLocaleString()}</span>
                                </div>
                                <p style={{ fontSize: 11, color: C.textLight, marginBottom: 16, marginTop: 0 }}>Shipping calculated at checkout.</p>
                                <Link
                                    href="/checkout"
                                    onClick={() => setIsCartOpen(false)}
                                    className="btn-gold"
                                    style={{
                                        display: "block",
                                        textAlign: "center",
                                        backgroundColor: C.gold,
                                        color: C.white,
                                        padding: "14px 0",
                                        fontSize: 12,
                                        letterSpacing: "0.2em",
                                        textTransform: "uppercase",
                                        fontWeight: 500,
                                        textDecoration: "none",
                                        transition: "background-color 0.3s",
                                    }}
                                >
                                    Proceed to Checkout
                                </Link>
                                <Link
                                    href="/cart"
                                    onClick={() => setIsCartOpen(false)}
                                    className="text-hover"
                                    style={{ display: "block", textAlign: "center", marginTop: 12, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: C.textMuted, textDecoration: "none" }}
                                >
                                    View Full Cart
                                </Link>
                            </div>
                        )}
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
