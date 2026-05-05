"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Category, Product } from "@/lib/types";
import { C, container, dividerCenter } from "@/styles/constants";

interface Props {
    products: Product[];
    categories: Category[];
}

export default function ShopClient({ products, categories }: Props) {
    const [filter, setFilter] = useState<number | "all">("all");

    const filtered = useMemo(() => {
        if (filter === "all") return products;
        return products.filter((p) => p.category_id === filter);
    }, [products, filter]);

    return (
        <>
            {/* Header */}
            <section style={{ paddingBlock: 64, backgroundColor: C.bgAlt }}>
                <div style={{ ...container, textAlign: "center" }}>
                    <p style={{ color: C.gold, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                        <Sparkles size={14} /> The Boutique <Sparkles size={14} />
                    </p>
                    <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 40, fontWeight: 300, color: C.text, letterSpacing: "0.04em", margin: 0 }}>
                        Shop the Collection
                    </h1>
                    <hr style={dividerCenter} />
                    <p style={{ color: C.textMuted, fontSize: 14, marginTop: 18, maxWidth: 520, marginInline: "auto" }}>
                        Discover the full Sillage portfolio — from iconic signatures to rare niche compositions.
                    </p>
                </div>
            </section>

            <section style={{ paddingBlock: 64, backgroundColor: C.bg }}>
                <div style={container}>
                    {/* Filters */}
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 48 }}>
                        {[{ id: "all" as const, name: "All" }, ...categories.map((c) => ({ id: c.id, name: c.name }))].map((cat) => {
                            const active = filter === cat.id;
                            return (
                                <button
                                    key={String(cat.id)}
                                    onClick={() => setFilter(cat.id)}
                                    style={{
                                        padding: "10px 22px",
                                        fontSize: 11,
                                        letterSpacing: "0.18em",
                                        textTransform: "uppercase",
                                        border: `1px solid ${active ? C.gold : C.border}`,
                                        backgroundColor: active ? C.gold : "transparent",
                                        color: active ? "#fff" : C.text,
                                        cursor: "pointer",
                                        transition: "all 0.3s",
                                    }}
                                >
                                    {cat.name}
                                </button>
                            );
                        })}
                    </div>

                    {filtered.length === 0 ? (
                        <div style={{ textAlign: "center", paddingBlock: 80 }}>
                            <p style={{ color: C.textMuted, fontSize: 14 }}>No products in this collection yet.</p>
                        </div>
                    ) : (
                        <motion.div
                            layout
                            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", columnGap: 32, rowGap: 48 }}
                            className="grid-sm-2"
                        >
                            {filtered.map((p, i) => (
                                <ProductCard key={p.id} product={p} index={i} />
                            ))}
                        </motion.div>
                    )}

                    <div style={{ textAlign: "center", marginTop: 64 }}>
                        <Link href="/" className="text-hover" style={{ color: C.textMuted, fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
