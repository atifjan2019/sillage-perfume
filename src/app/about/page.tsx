import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About | Sillage Perfume",
    description: "Learn about Sillage Perfume — our story, our craft, and our commitment to luxury fragrances.",
};

export default function AboutPage() {
    return (
        <>
            <section style={{ paddingBlock: 64, backgroundColor: "#f8f7f4" }}>
                <div style={{ maxWidth: 1400, marginInline: "auto", paddingInline: 24, textAlign: "center" }}>
                    <p style={{ color: "#c9a96e", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>Our Story</p>
                    <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 44, fontWeight: 300, color: "#1a1a1a", letterSpacing: "0.04em", margin: 0 }}>
                        About Sillage
                    </h1>
                    <hr style={{ width: 64, height: 1, backgroundColor: "#c9a96e", marginTop: 16, marginInline: "auto", border: "none" }} />
                </div>
            </section>

            <section style={{ paddingBlock: 80, backgroundColor: "#ffffff" }}>
                <div style={{ maxWidth: 800, marginInline: "auto", paddingInline: 24 }}>
                    <div style={{ color: "#555", fontSize: 15, lineHeight: 1.9, fontWeight: 300 }}>
                        <p>
                            Founded in 2024, Sillage was born from a singular vision: to create perfumes that transcend the ordinary and become extensions of one&apos;s identity. We believe that a truly great fragrance isn&apos;t just worn — it&apos;s experienced.
                        </p>
                        <p>
                            Our master perfumers source the world&apos;s rarest and most exquisite raw materials — from Cambodian oud and Bulgarian rose to Italian bergamot and Indian sandalwood. Each ingredient is selected not just for its scent, but for its story.
                        </p>
                        <p>
                            Every Sillage fragrance undergoes a meticulous creation process that can span months. We don&apos;t rush perfection. Our compositions are layered with intention, designed to evolve on your skin throughout the day, revealing new facets with every passing hour.
                        </p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, paddingBlock: 56, marginBlock: 56, borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #f0f0f0" }} className="sm-full">
                        {[
                            { number: "50+", label: "Rare Ingredients" },
                            { number: "9", label: "Signature Fragrances" },
                            { number: "1000+", label: "Happy Customers" },
                        ].map((stat) => (
                            <div key={stat.label} style={{ textAlign: "center" }}>
                                <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 38, fontWeight: 300, color: "#c9a96e", margin: 0 }}>{stat.number}</p>
                                <p style={{ color: "#999", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 6 }}>{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ color: "#555", fontSize: 15, lineHeight: 1.9, fontWeight: 300 }}>
                        <p>
                            At Sillage, we are committed to sustainability and ethical sourcing. We work directly with farmers and distillers around the world, ensuring fair trade practices while maintaining the highest quality standards.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
