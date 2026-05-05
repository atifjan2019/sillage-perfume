"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Category, Product } from "@/lib/types";
import { C, container, dividerCenter } from "@/styles/constants";

interface Props {
    category: Category;
    products: Product[];
}

export default function CategoryClient({ category, products }: Props) {
    return (
        <>
            <section style={{ paddingBlock: 64, backgroundColor: C.bgAlt }}>
                <div style={{ ...container, textAlign: "center" }}>
                    <p style={{ color: C.gold, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>Collection</p>
                    <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 44, fontWeight: 300, color: C.text, letterSpacing: "0.04em", margin: 0 }}>
                        {category.name}
                    </h1>
                    <hr style={dividerCenter} />
                    {category.description && (
                        <p style={{ color: C.textMuted, fontSize: 14, marginTop: 18, maxWidth: 560, marginInline: "auto" }}>
                            {category.description}
                        </p>
                    )}
                    <p style={{ color: C.textLight, fontSize: 12, marginTop: 16, letterSpacing: "0.1em" }}>
                        {category.products_count} {category.products_count === 1 ? "fragrance" : "fragrances"}
                    </p>
                </div>
            </section>

            <section style={{ paddingBlock: 64, backgroundColor: C.bg }}>
                <div style={container}>
                    {products.length === 0 ? (
                        <div style={{ textAlign: "center", paddingBlock: 64 }}>
                            <p style={{ color: C.textMuted, fontSize: 14 }}>No products in this category yet.</p>
                        </div>
                    ) : (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", columnGap: 32, rowGap: 48 }} className="grid-sm-2">
                            {products.map((p, i) => (<ProductCard key={p.id} product={p} index={i} />))}
                        </div>
                    )}

                    <div style={{ textAlign: "center", marginTop: 48 }}>
                        <Link href="/shop" className="text-hover" style={{ color: C.textMuted, fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
                            ← All Collections
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
