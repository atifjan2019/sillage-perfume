import Link from "next/link";

export default function Footer() {
    return (
        <footer style={{ backgroundColor: "var(--charcoal)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <h2 className="text-2xl tracking-[0.35em] font-light mb-4" style={{ fontFamily: "var(--font-cormorant)", color: "var(--gold)" }}>
                            SWAN
                        </h2>
                        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                            Crafting extraordinary fragrances for those who dare to be different. Each scent tells a unique story.
                        </p>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="text-xs tracking-[0.2em] uppercase mb-5 font-medium" style={{ color: "var(--gold)" }}>Shop</h3>
                        <ul className="space-y-3">
                            {[
                                { href: "/category/eau-de-parfum", label: "Eau de Parfum" },
                                { href: "/category/eau-de-toilette", label: "Eau de Toilette" },
                                { href: "/category/oud-collection", label: "Oud Collection" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm transition-colors duration-300" style={{ color: "rgba(255,255,255,0.4)" }}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-xs tracking-[0.2em] uppercase mb-5 font-medium" style={{ color: "var(--gold)" }}>Company</h3>
                        <ul className="space-y-3">
                            {[
                                { href: "/about", label: "About Us" },
                                { href: "/contact", label: "Contact" },
                                { href: "/shipping-returns", label: "Shipping & Returns" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm transition-colors duration-300" style={{ color: "rgba(255,255,255,0.4)" }}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-xs tracking-[0.2em] uppercase mb-5 font-medium" style={{ color: "var(--gold)" }}>Stay Updated</h3>
                        <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                            Subscribe for exclusive releases and offers.
                        </p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 px-4 py-2.5 text-sm rounded-l-lg outline-none"
                                style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "var(--cream)", border: "1px solid rgba(255,255,255,0.1)" }}
                            />
                            <button className="px-5 py-2.5 rounded-r-lg text-xs font-medium tracking-wider uppercase"
                                style={{ backgroundColor: "var(--gold)", color: "#0a0a0a" }}>
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <p className="text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>
                        © 2024 SWAN PERFUMES. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex items-center gap-6">
                        {["Privacy Policy", "Terms of Service"].map((text) => (
                            <span key={text} className="text-xs cursor-pointer" style={{ color: "rgba(255,255,255,0.3)" }}>{text}</span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
