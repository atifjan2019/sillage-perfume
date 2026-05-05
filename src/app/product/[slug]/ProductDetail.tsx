"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Truck, ShieldCheck, Undo2, Star, Check } from "lucide-react";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart";
import ProductCard from "@/components/ProductCard";
import { C, container } from "@/styles/constants";

function formatPrice(price: string | number) {
    return `Rs. ${Number(price).toLocaleString()}`;
}

export default function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
    const { addItem } = useCart();
    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);
    const [activeImage, setActiveImage] = useState(0);

    const images = product.images && product.images.length > 0 ? product.images : ["/images/products/w6.webp"];
    const hasDiscount = product.sale_price !== null;
    const effectivePrice = product.sale_price ?? product.price;
    const discountPercent = hasDiscount ? Math.round((1 - parseFloat(product.sale_price!) / parseFloat(product.price)) * 100) : 0;

    const handleAdd = () => {
        addItem(product, qty);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <>
            {/* Breadcrumb */}
            <div style={{ ...container, paddingBlock: 24 }}>
                <nav style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.textLight }}>
                    <Link href="/" className="text-hover" style={{ color: C.textMuted, textDecoration: "none" }}>Home</Link>
                    <span>/</span>
                    {product.category && (
                        <>
                            <Link href={`/category/${product.category.slug}`} className="text-hover" style={{ color: C.textMuted, textDecoration: "none" }}>{product.category.name}</Link>
                            <span>/</span>
                        </>
                    )}
                    <span style={{ color: C.gold }}>{product.name}</span>
                </nav>
            </div>

            <section style={{ paddingBottom: 80, backgroundColor: C.bg }}>
                <div style={container}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }} className="lg-grid-2 sm-full">
                        {/* Gallery */}
                        <div>
                            <div style={{ position: "relative", aspectRatio: "3/4", backgroundColor: C.bgAlt, overflow: "hidden" }}>
                                <motion.div
                                    key={activeImage}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                    style={{ position: "absolute", inset: 0 }}
                                >
                                    <Image src={images[activeImage]} alt={product.name} fill style={{ objectFit: "cover" }} priority sizes="(max-width: 1024px) 100vw, 50vw" />
                                </motion.div>
                                {hasDiscount && (
                                    <span style={{ position: "absolute", top: 16, left: 16, backgroundColor: C.dark, color: "#fff", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", padding: "5px 12px", fontWeight: 500 }}>
                                        Save {discountPercent}%
                                    </span>
                                )}
                            </div>
                            {images.length > 1 && (
                                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                                    {images.map((src, i) => (
                                        <button
                                            key={src}
                                            onClick={() => setActiveImage(i)}
                                            style={{
                                                width: 72,
                                                height: 90,
                                                position: "relative",
                                                overflow: "hidden",
                                                cursor: "pointer",
                                                border: i === activeImage ? `1px solid ${C.gold}` : `1px solid ${C.border}`,
                                                background: "none",
                                                padding: 0,
                                            }}
                                        >
                                            <Image src={src} alt={`${product.name} ${i + 1}`} fill style={{ objectFit: "cover" }} sizes="72px" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Details */}
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            {product.category && (
                                <p style={{ color: C.gold, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 14 }}>{product.category.name}</p>
                            )}
                            <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 40, fontWeight: 300, color: C.text, letterSpacing: "0.04em", margin: 0, marginBottom: 16 }}>
                                {product.name}
                            </h1>

                            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
                                {[...Array(5)].map((_, i) => (<Star key={i} size={14} fill={C.gold} color={C.gold} />))}
                                <span style={{ color: C.textLight, fontSize: 12, marginLeft: 6 }}>(24 reviews)</span>
                            </div>

                            <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 24 }}>
                                <span style={{ color: C.gold, fontSize: 28, fontWeight: 600 }}>{formatPrice(effectivePrice)}</span>
                                {hasDiscount && (
                                    <span style={{ color: C.textLight, fontSize: 16, textDecoration: "line-through" }}>{formatPrice(product.price)}</span>
                                )}
                            </div>

                            <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.8, marginBottom: 28 }}>
                                {product.description}
                            </p>

                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                                <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: product.stock > 0 ? "#22c55e" : "#ef4444" }} />
                                <span style={{ fontSize: 12, color: C.textMuted, letterSpacing: "0.05em" }}>
                                    {product.stock > 10 ? "In Stock" : product.stock > 0 ? `Only ${product.stock} left` : "Out of Stock"}
                                </span>
                                {product.sku && (
                                    <span style={{ marginLeft: 12, fontSize: 11, color: C.textLight }}>SKU: {product.sku}</span>
                                )}
                            </div>

                            {product.stock > 0 && (
                                <div style={{ display: "flex", alignItems: "stretch", gap: 12, marginBottom: 32 }}>
                                    <div style={{ display: "flex", alignItems: "center", border: `1px solid ${C.border}` }}>
                                        <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 44, height: 52, background: "none", border: "none", cursor: "pointer", color: C.text, fontSize: 18 }}>−</button>
                                        <span style={{ width: 44, textAlign: "center", color: C.text, fontSize: 14 }}>{qty}</span>
                                        <button onClick={() => setQty(Math.min(product.stock, qty + 1))} style={{ width: 44, height: 52, background: "none", border: "none", cursor: "pointer", color: C.text, fontSize: 18 }}>+</button>
                                    </div>
                                    <button
                                        onClick={handleAdd}
                                        className="btn-gold"
                                        style={{
                                            flex: 1,
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 10,
                                            backgroundColor: added ? "#22c55e" : C.gold,
                                            color: "#fff",
                                            border: "none",
                                            cursor: "pointer",
                                            padding: "14px 28px",
                                            fontSize: 12,
                                            letterSpacing: "0.2em",
                                            textTransform: "uppercase",
                                            fontWeight: 500,
                                            transition: "background-color 0.3s",
                                        }}
                                    >
                                        {added ? <><Check size={16} /> Added</> : <><ShoppingBag size={16} /> Add to Cart</>}
                                    </button>
                                </div>
                            )}

                            {/* Trust strip */}
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, paddingTop: 24, borderTop: `1px solid ${C.borderLight}` }}>
                                {[
                                    { Icon: Truck, label: "Free Shipping", sub: "Over Rs. 5,000" },
                                    { Icon: ShieldCheck, label: "Authentic", sub: "100% genuine" },
                                    { Icon: Undo2, label: "7-Day Returns", sub: "Easy & free" },
                                ].map((f) => (
                                    <div key={f.label} style={{ textAlign: "center" }}>
                                        <span style={{ display: "inline-flex", color: C.gold }}><f.Icon size={20} strokeWidth={1.5} /></span>
                                        <p style={{ fontSize: 12, color: C.text, marginTop: 6, marginBottom: 2, letterSpacing: "0.05em" }}>{f.label}</p>
                                        <p style={{ fontSize: 11, color: C.textLight, margin: 0 }}>{f.sub}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {related.length > 0 && (
                        <div style={{ marginTop: 80, paddingTop: 64, borderTop: `1px solid ${C.borderLight}` }}>
                            <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 32, fontWeight: 300, color: C.text, letterSpacing: "0.04em", marginBottom: 32, textAlign: "center" }}>
                                You May Also Like
                            </h2>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", columnGap: 32, rowGap: 48 }} className="grid-sm-2">
                                {related.map((p, i) => (<ProductCard key={p.id} product={p} index={i} />))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
