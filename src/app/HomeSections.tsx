"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import { Category, Product } from "@/lib/types";
import { C, container, dividerCenter } from "@/styles/constants";

interface Props {
    categories: Category[];
    products: Product[];
}

export default function HomeSections({ categories, products }: Props) {
    const collections = categories.slice(0, 3).map((cat) => {
        const catProducts = products.filter((p) => p.category_id === cat.id);
        const fallback = catProducts[0]?.images?.[0] ?? products[0]?.images?.[0] ?? "/images/products/w6.webp";
        return {
            title: cat.name,
            subtitle: cat.description ?? "",
            image: fallback,
            href: `/category/${cat.slug}`,
        };
    });

    const heading: React.CSSProperties = {
        fontFamily: "var(--font-playfair), Georgia, serif",
        fontSize: 36,
        fontWeight: 300,
        color: C.text,
        letterSpacing: "0.04em",
        margin: 0,
    };

    const subLabel: React.CSSProperties = {
        color: C.gold,
        fontSize: 11,
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        marginBottom: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    };

    return (
        <>
            <HeroSection />

            {/* Featured Collections */}
            <section style={{ paddingBlock: 80, backgroundColor: C.bg }}>
                <div style={container}>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 48 }}>
                        <p style={subLabel}>
                            <Sparkles size={14} /> Our Collections <Sparkles size={14} />
                        </p>
                        <h2 style={heading}>Featured Collections</h2>
                        <hr style={dividerCenter} />
                    </motion.div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="sm-full">
                        {collections.map((col, i) => (
                            <motion.div
                                key={col.href}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12 }}
                            >
                                <Link href={col.href} className="card-hover" style={{ display: "block", position: "relative", textDecoration: "none", overflow: "hidden", aspectRatio: "3/4", backgroundColor: C.bgCard }}>
                                    <div style={{ position: "absolute", inset: 0 }}>
                                        <Image src={col.image} alt={col.title} fill style={{ objectFit: "cover", transition: "transform 0.7s" }} sizes="(max-width: 768px) 100vw, 33vw" />
                                    </div>
                                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" }} />
                                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 28, color: "#fff" }}>
                                        <p style={{ color: C.gold, fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", margin: 0, marginBottom: 6 }}>Collection</p>
                                        <h3 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 24, fontWeight: 400, margin: 0, letterSpacing: "0.05em" }}>{col.title}</h3>
                                        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 8, lineHeight: 1.5, maxWidth: 260 }}>{col.subtitle}</p>
                                        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 16, color: C.gold, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                                            Explore <ArrowRight size={14} />
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products grid */}
            <section style={{ paddingBlock: 80, backgroundColor: C.bgAlt }}>
                <div style={container}>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 48 }}>
                        <p style={subLabel}>
                            <Sparkles size={14} /> Our Products <Sparkles size={14} />
                        </p>
                        <h2 style={heading}>Luxury Fragrances</h2>
                        <hr style={dividerCenter} />
                    </motion.div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", columnGap: 32, rowGap: 48 }} className="grid-sm-2">
                        {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
                    </div>

                    <div style={{ textAlign: "center", marginTop: 48 }}>
                        <Link href="/shop" className="btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${C.gold}`, color: C.gold, padding: "12px 32px", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.3s" }}>
                            View All Products <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Editorial Mosaic */}
            <section style={{ paddingBlock: 80, backgroundColor: C.bg }}>
                <div style={container}>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 48 }}>
                        <p style={{ ...subLabel, justifyContent: "center" }}>The Sillage Experience</p>
                        <h2 style={heading}>A World of Fragrance</h2>
                        <hr style={dividerCenter} />
                    </motion.div>

                    <div className="mosaic-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 12, height: "clamp(500px, 65vw, 720px)" }}>
                        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mosaic-item" style={{ gridRow: "1 / 3", position: "relative", overflow: "hidden", cursor: "pointer" }}>
                            <Image src="/images/products/w6.webp" alt="The craft" fill style={{ objectFit: "cover", transition: "transform 0.7s" }} sizes="50vw" />
                            <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.4)" }} />
                            <div style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
                                <p style={{ color: C.gold, fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 6 }}>Handcrafted</p>
                                <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#fff", fontSize: "clamp(20px, 2.5vw, 30px)", fontWeight: 300, letterSpacing: "0.04em", lineHeight: 1.3, margin: 0 }}>Crafted with<br />Passion & Precision</p>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} className="mosaic-item" style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}>
                            <Image src="/images/products/w12.webp" alt="Layering" fill style={{ objectFit: "cover", transition: "transform 0.7s" }} sizes="50vw" />
                            <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.4)" }} />
                            <div style={{ position: "absolute", bottom: 24, left: 24, right: 24 }}>
                                <p style={{ color: C.gold, fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 4 }}>Explore</p>
                                <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#fff", fontSize: "clamp(16px, 2vw, 24px)", fontWeight: 300, margin: 0 }}>The Art of Layering</p>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }} className="mosaic-item" style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}>
                            <Image src="/images/products/w24.webp" alt="Timeless" fill style={{ objectFit: "cover", transition: "transform 0.7s" }} sizes="50vw" />
                            <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.4)" }} />
                            <div style={{ position: "absolute", bottom: 24, left: 24, right: 24 }}>
                                <p style={{ color: C.gold, fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 4 }}>Luxury</p>
                                <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#fff", fontSize: "clamp(16px, 2vw, 24px)", fontWeight: 300, margin: 0 }}>Timeless Elegance</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Banner CTA */}
            <section style={{ position: "relative", paddingBlock: 96, overflow: "hidden" }}>
                <Image src="/images/hero-sunset.jpg" alt="Shop and Save" fill style={{ objectFit: "cover" }} sizes="100vw" />
                <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.6)" }} />
                <div style={{ position: "relative", zIndex: 10, maxWidth: 720, marginInline: "auto", textAlign: "center", paddingInline: 24 }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <p style={{ color: C.gold, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16 }}>Limited Time Offer</p>
                        <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(28px, 4vw, 50px)", fontWeight: 300, color: "#fff", letterSpacing: "0.04em", lineHeight: 1.2, margin: 0 }}>Shop & Save on<br />Luxury Perfumes</h2>
                        <p style={{ color: "#ccc", marginTop: 16, fontWeight: 300, letterSpacing: "0.05em" }}>Up to 30% off on selected fragrances from our exclusive collection</p>
                        <Link href="/shop" className="btn-gold" style={{ display: "inline-block", marginTop: 32, backgroundColor: C.gold, color: C.white, padding: "16px 40px", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none", transition: "all 0.3s" }}>Shop Now</Link>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials */}
            <section style={{ paddingBlock: 80, backgroundColor: C.bg }}>
                <div style={container}>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 48 }}>
                        <h2 style={heading}>What Our Clients Say</h2>
                        <hr style={dividerCenter} />
                    </motion.div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }} className="sm-full">
                        {[
                            { name: "Ayesha Khan", text: "Oud Royale is absolutely mesmerizing. The depth is incredible and lasting. I get compliments every time I wear it." },
                            { name: "Fatima Rizvi", text: "Noir Velours is the most elegant fragrance I have ever owned. Subtle yet captivating — perfect for any occasion." },
                            { name: "Hira Ahmed", text: "Nuit de Mai is pure magic in a bottle. The tuberose and jasmine blend is heavenly. Will definitely order again." },
                        ].map((review, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="border-hover"
                                style={{ border: `1px solid ${C.borderLight}`, backgroundColor: C.bgAlt, padding: 32, textAlign: "center", transition: "border-color 0.3s" }}
                            >
                                <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 16 }}>
                                    {[...Array(5)].map((_, j) => (
                                        <Star key={j} size={14} fill={C.gold} color={C.gold} />
                                    ))}
                                </div>
                                <p style={{ color: "#666", fontSize: 14, lineHeight: 1.7, fontStyle: "italic", margin: 0 }}>&ldquo;{review.text}&rdquo;</p>
                                <p style={{ color: C.gold, fontSize: 13, letterSpacing: "0.1em", marginTop: 16, textTransform: "uppercase", fontWeight: 500, marginBottom: 0 }}>{review.name}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
