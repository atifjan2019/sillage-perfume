import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About | Sillage Perfume",
    description: "Learn about Sillage Perfume — our story, our craft, and our commitment to luxury fragrances.",
};

export default function AboutPage() {
    return (
        <div className="pt-20 sm:pt-24">
            <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold-dark)" }}>Our Story</p>
                    <h1 className="text-4xl sm:text-5xl font-light tracking-wide mb-6"
                        style={{ fontFamily: "var(--font-cormorant)", color: "var(--cream)" }}>
                        About Sillage
                    </h1>
                    <div className="w-16 h-px mx-auto" style={{ backgroundColor: "var(--gold)" }} />
                </div>

                <div className="space-y-8 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                    <p>
                        Founded in 2024, Sillage was born from a singular vision: to create perfumes that transcend the ordinary and become extensions of one&apos;s identity. We believe that a truly great fragrance isn&apos;t just worn — it&apos;s experienced.
                    </p>
                    <p>
                        Our master perfumers source the world&apos;s rarest and most exquisite raw materials — from Cambodian oud and Bulgarian rose to Italian bergamot and Indian sandalwood. Each ingredient is selected not just for its scent, but for its story.
                    </p>
                    <p>
                        Every Sillage fragrance undergoes a meticulous creation process that can span months. We don&apos;t rush perfection. Our compositions are layered with intention, designed to evolve on your skin throughout the day, revealing new facets with every passing hour.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-12" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        {[
                            { number: "50+", label: "Rare Ingredients" },
                            { number: "5", label: "Signature Fragrances" },
                            { number: "1000+", label: "Happy Customers" },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="text-3xl font-light mb-2" style={{ fontFamily: "var(--font-cormorant)", color: "var(--gold)" }}>{stat.number}</p>
                                <p className="text-xs tracking-[0.15em] uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <p>
                        At Sillage, we are committed to sustainability and ethical sourcing. We work directly with farmers and distillers around the world, ensuring fair trade practices while maintaining the highest quality standards.
                    </p>
                </div>
            </section>
        </div>
    );
}
