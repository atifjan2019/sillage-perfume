import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Leaf, Sparkles, Globe2, HeartHandshake, ArrowRight, Quote } from "lucide-react";
import { C } from "@/styles/constants";

export const metadata: Metadata = {
    title: "About | Sillage Perfume",
    description:
        "The art of fragrance, crafted with intention. Discover the Sillage story — our heritage, our perfumers, and our devotion to rare materials.",
};

const headingFont = "var(--font-playfair), Georgia, serif";

const pillars = [
    {
        Icon: Sparkles,
        title: "Rare Materials",
        body: "We source the world's most exquisite raw ingredients — Cambodian oud, Bulgarian rose, Indian sandalwood — each chosen for its character and story.",
    },
    {
        Icon: Leaf,
        title: "Sustainable Craft",
        body: "Every fragrance is composed with respect for the land and the makers. Ethical sourcing, fair partnerships, and a lighter footprint guide our work.",
    },
    {
        Icon: Globe2,
        title: "Global Heritage",
        body: "From the lavender fields of Provence to the spice routes of Kerala, our perfumers travel the world to capture scents that move us.",
    },
    {
        Icon: HeartHandshake,
        title: "Made With Intention",
        body: "We do not rush perfection. Each composition is layered slowly, evolving on the skin to reveal new facets through the day.",
    },
];

const process = [
    { step: "01", title: "Discover", body: "Our perfumers travel the globe in search of rare botanicals and aromatic treasures." },
    { step: "02", title: "Compose", body: "Months of blending and refinement shape each accord — top, heart, and base in harmony." },
    { step: "03", title: "Distill", body: "Small-batch maceration allows the materials to marry and mature, deepening their character." },
    { step: "04", title: "Bottle", body: "Each fragrance is hand-finished, numbered, and prepared with the care of a personal letter." },
];

export default function AboutPage() {
    return (
        <>
            {/* Hero */}
            <section style={{ position: "relative", height: "70vh", minHeight: 480, overflow: "hidden" }}>
                <Image
                    src="/images/hero-sunset.jpg"
                    alt="Sillage atelier"
                    fill
                    priority
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.7))" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 24 }}>
                    <div style={{ maxWidth: 760 }}>
                        <p style={{ color: C.gold, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", margin: 0, marginBottom: 18 }}>The Sillage House</p>
                        <h1 style={{ fontFamily: headingFont, fontSize: "clamp(40px, 6vw, 76px)", fontWeight: 300, color: "#fff", letterSpacing: "0.04em", lineHeight: 1.1, margin: 0 }}>
                            The Art of <span style={{ color: C.gold, fontStyle: "italic" }}>Sillage</span>
                        </h1>
                        <div style={{ width: 64, height: 1, backgroundColor: C.gold, marginInline: "auto", marginTop: 28 }} />
                        <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 15, lineHeight: 1.85, marginTop: 28, fontWeight: 300 }}>
                            A maison devoted to the quiet luxury of scent — where time, terroir, and craft meet in every bottle.
                        </p>
                    </div>
                </div>
            </section>

            {/* Editorial intro: image + text */}
            <section style={{ paddingBlock: 96, backgroundColor: C.bg }}>
                <div style={{ maxWidth: 1200, marginInline: "auto", paddingInline: 24 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="sm-full">
                        <div style={{ position: "relative", aspectRatio: "4 / 5", overflow: "hidden" }}>
                            <Image src="/images/hero-coastal.jpg" alt="Our perfumer at work" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
                        </div>
                        <div>
                            <p style={{ color: C.gold, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 14 }}>Our Story</p>
                            <h2 style={{ fontFamily: headingFont, fontSize: "clamp(28px, 3.4vw, 42px)", fontWeight: 300, color: C.text, letterSpacing: "0.03em", lineHeight: 1.2, margin: 0 }}>
                                Born from a singular <span style={{ fontStyle: "italic", color: C.gold }}>obsession</span> with scent.
                            </h2>
                            <div style={{ width: 48, height: 1, backgroundColor: C.gold, marginBlock: 24 }} />
                            <div style={{ color: C.textMuted, fontSize: 15, lineHeight: 1.9, fontWeight: 300, display: "flex", flexDirection: "column", gap: 16 }}>
                                <p style={{ margin: 0 }}>
                                    Founded in 2024, Sillage was born from a singular vision: to create perfumes that transcend the ordinary and become extensions of one&apos;s identity. We believe a great fragrance isn&apos;t just worn — it is experienced.
                                </p>
                                <p style={{ margin: 0 }}>
                                    Our master perfumers source the world&apos;s rarest raw materials — from Cambodian oud and Bulgarian rose to Italian bergamot and Indian sandalwood. Each ingredient is selected not only for its scent, but for its story.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pillars */}
            <section style={{ paddingBlock: 96, backgroundColor: C.bgAlt }}>
                <div style={{ maxWidth: 1200, marginInline: "auto", paddingInline: 24 }}>
                    <div style={{ textAlign: "center", marginBottom: 64 }}>
                        <p style={{ color: C.gold, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>Our Principles</p>
                        <h2 style={{ fontFamily: headingFont, fontSize: "clamp(28px, 3.4vw, 42px)", fontWeight: 300, color: C.text, letterSpacing: "0.04em", margin: 0 }}>
                            What guides our craft
                        </h2>
                        <div style={{ width: 48, height: 1, backgroundColor: C.gold, marginInline: "auto", marginTop: 18 }} />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, border: `1px solid ${C.borderLight}`, backgroundColor: C.bg }} className="sm-full grid-sm-2">
                        {pillars.map((p, i) => (
                            <div
                                key={p.title}
                                style={{
                                    padding: "44px 28px",
                                    borderRight: i < pillars.length - 1 ? `1px solid ${C.borderLight}` : "none",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 16,
                                }}
                            >
                                <div style={{ width: 44, height: 44, borderRadius: "50%", border: `1px solid ${C.gold}`, display: "flex", alignItems: "center", justifyContent: "center", color: C.gold }}>
                                    <p.Icon size={18} strokeWidth={1.5} />
                                </div>
                                <h3 style={{ fontFamily: headingFont, fontSize: 20, fontWeight: 400, color: C.text, letterSpacing: "0.04em", margin: 0 }}>{p.title}</h3>
                                <p style={{ color: C.textMuted, fontSize: 13, lineHeight: 1.8, margin: 0 }}>{p.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats band on dark */}
            <section style={{ paddingBlock: 80, backgroundColor: "#111" }}>
                <div style={{ maxWidth: 1200, marginInline: "auto", paddingInline: 24 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }} className="sm-full grid-sm-2">
                        {[
                            { number: "50+", label: "Rare Ingredients" },
                            { number: "9", label: "Signature Fragrances" },
                            { number: "1000+", label: "Discerning Clients" },
                            { number: "12", label: "Countries Sourced" },
                        ].map((s) => (
                            <div key={s.label} style={{ textAlign: "center", padding: "12px 8px" }}>
                                <p style={{ fontFamily: headingFont, fontSize: "clamp(40px, 5vw, 60px)", fontWeight: 300, color: C.gold, margin: 0, lineHeight: 1 }}>{s.number}</p>
                                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", marginTop: 14 }}>{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section style={{ paddingBlock: 96, backgroundColor: C.bg }}>
                <div style={{ maxWidth: 1200, marginInline: "auto", paddingInline: 24 }}>
                    <div style={{ textAlign: "center", marginBottom: 64 }}>
                        <p style={{ color: C.gold, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>The Method</p>
                        <h2 style={{ fontFamily: headingFont, fontSize: "clamp(28px, 3.4vw, 42px)", fontWeight: 300, color: C.text, letterSpacing: "0.04em", margin: 0 }}>
                            From soil to <span style={{ fontStyle: "italic", color: C.gold }}>sillage</span>
                        </h2>
                        <div style={{ width: 48, height: 1, backgroundColor: C.gold, marginInline: "auto", marginTop: 18 }} />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }} className="sm-full grid-sm-2">
                        {process.map((p, i) => (
                            <div key={p.step} style={{ position: "relative", paddingTop: 28 }}>
                                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, backgroundColor: C.borderLight }}>
                                    <div style={{ position: "absolute", top: -3, left: 0, width: 28, height: 5, backgroundColor: C.gold }} />
                                </div>
                                <p style={{ fontFamily: headingFont, fontSize: 14, color: C.gold, letterSpacing: "0.2em", margin: 0, marginBottom: 12 }}>{p.step}</p>
                                <h3 style={{ fontFamily: headingFont, fontSize: 22, fontWeight: 400, color: C.text, margin: 0, marginBottom: 12, letterSpacing: "0.03em" }}>{p.title}</h3>
                                <p style={{ color: C.textMuted, fontSize: 13, lineHeight: 1.8, margin: 0 }}>{p.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Founder quote */}
            <section style={{ paddingBlock: 96, backgroundColor: C.bgAlt }}>
                <div style={{ maxWidth: 880, marginInline: "auto", paddingInline: 24, textAlign: "center" }}>
                    <Quote size={32} style={{ color: C.gold }} strokeWidth={1.2} />
                    <p style={{ fontFamily: headingFont, fontSize: "clamp(22px, 2.6vw, 32px)", fontWeight: 300, color: C.text, lineHeight: 1.5, fontStyle: "italic", letterSpacing: "0.02em", marginTop: 24 }}>
                        &ldquo;A perfume is a memory you wear. We are not in the business of fragrance — we are in the business of moments that last long after the wearer has left the room.&rdquo;
                    </p>
                    <div style={{ width: 48, height: 1, backgroundColor: C.gold, marginInline: "auto", marginBlock: 28 }} />
                    <p style={{ color: C.text, fontSize: 13, letterSpacing: "0.25em", textTransform: "uppercase", margin: 0, fontWeight: 500 }}>The Sillage Atelier</p>
                    <p style={{ color: C.textLight, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 6 }}>Founders &amp; Master Perfumers</p>
                </div>
            </section>

            {/* CTA */}
            <section style={{ paddingBlock: 96, backgroundColor: C.bg }}>
                <div style={{ maxWidth: 1200, marginInline: "auto", paddingInline: 24 }}>
                    <div style={{ position: "relative", overflow: "hidden", padding: "clamp(48px, 7vw, 96px) 32px", textAlign: "center", border: `1px solid ${C.borderLight}` }}>
                        <p style={{ color: C.gold, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", margin: 0, marginBottom: 14 }}>Discover</p>
                        <h2 style={{ fontFamily: headingFont, fontSize: "clamp(28px, 3.6vw, 44px)", fontWeight: 300, color: C.text, letterSpacing: "0.03em", lineHeight: 1.2, margin: 0 }}>
                            Find the fragrance that <span style={{ fontStyle: "italic", color: C.gold }}>tells your story</span>
                        </h2>
                        <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.8, maxWidth: 560, marginInline: "auto", marginTop: 18 }}>
                            Our collection is small by design — every bottle the work of patience and intention.
                        </p>
                        <Link
                            href="/shop"
                            className="btn-gold"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 10,
                                marginTop: 32,
                                backgroundColor: C.gold,
                                color: "#fff",
                                padding: "14px 32px",
                                fontSize: 11,
                                letterSpacing: "0.25em",
                                textTransform: "uppercase",
                                textDecoration: "none",
                                fontWeight: 500,
                                transition: "background-color 0.3s",
                            }}
                        >
                            Explore the Collection <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
