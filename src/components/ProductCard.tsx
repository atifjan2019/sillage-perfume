"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart";
import { C } from "@/styles/constants";

interface ProductCardProps {
    product: Product;
    index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
    const { addItem } = useCart();
    const primary = product.images?.[0] ?? "/images/products/w6.webp";
    const hover = product.images?.[1];
    const price = parseFloat(product.sale_price ?? product.price);
    const originalPrice = product.sale_price ? parseFloat(product.price) : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            className="card-hover"
            style={{ position: "relative" }}
        >
            <div style={{ position: "relative", overflow: "hidden", backgroundColor: C.bgCard }}>
                <Link href={`/product/${product.slug}`}>
                    <div style={{ aspectRatio: "3/4", position: "relative", overflow: "hidden" }}>
                        <Image
                            src={primary}
                            alt={product.name}
                            fill
                            style={{ objectFit: "cover", transition: "transform 0.7s" }}
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />
                        {hover && (
                            <Image
                                src={hover}
                                alt={`${product.name} alternate`}
                                fill
                                className="hover-img"
                                style={{ objectFit: "cover", opacity: 0, transition: "opacity 0.5s" }}
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                            />
                        )}
                        <div className="card-overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.2), transparent, transparent)", opacity: 0, transition: "opacity 0.5s" }} />
                    </div>
                </Link>

                {originalPrice && (
                    <span style={{ position: "absolute", top: 12, left: 12, backgroundColor: C.dark, color: "#fff", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", padding: "4px 10px", fontWeight: 500 }}>
                        Sale
                    </span>
                )}

                <button
                    onClick={() => addItem(product, 1)}
                    className="quick-add btn-dark"
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: C.dark,
                        color: "#fff",
                        padding: "12px 0",
                        fontSize: 11,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        border: "none",
                        cursor: "pointer",
                        transform: "translateY(100%)",
                        transition: "transform 0.4s, background-color 0.3s",
                    }}
                >
                    <ShoppingBag size={14} />
                    Add to Cart
                </button>
            </div>

            <div style={{ marginTop: 16, textAlign: "center" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, marginBottom: 8 }}>
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill={C.gold} color={C.gold} />
                    ))}
                    <span style={{ color: "#999", fontSize: 11, marginLeft: 6 }}>(24)</span>
                </div>
                <Link href={`/product/${product.slug}`} className="text-hover" style={{ color: C.text, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 300, textDecoration: "none", transition: "color 0.3s", fontFamily: "var(--font-playfair), Georgia, serif" }}>
                    {product.name}
                </Link>
                {product.category && (
                    <p style={{ color: "#999", fontSize: 12, marginTop: 4, letterSpacing: "0.05em" }}>{product.category.name}</p>
                )}
                <div style={{ marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    <span style={{ color: C.gold, fontSize: 14, fontWeight: 600 }}>Rs. {price.toLocaleString()}</span>
                    {originalPrice && <span style={{ color: "#ccc", fontSize: 12, textDecoration: "line-through" }}>Rs. {originalPrice.toLocaleString()}</span>}
                </div>
            </div>
        </motion.div>
    );
}
