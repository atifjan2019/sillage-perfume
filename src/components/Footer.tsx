"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Truck, ShieldCheck, Headphones, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { C } from "@/styles/constants";

export default function Footer() {
    const linkStyle: React.CSSProperties = {
        color: "#ffffff",
        fontSize: 13,
        textDecoration: "none",
        transition: "color 0.3s",
        letterSpacing: "0.03em",
        lineHeight: 1.6,
    };

    const headingStyle: React.CSSProperties = {
        color: C.white,
        fontSize: 11,
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        marginBottom: 24,
        fontWeight: 500,
        position: "relative",
        paddingBottom: 12,
    };

    const headingAfter: React.CSSProperties = {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: 24,
        height: 1,
        backgroundColor: C.gold,
    };

    return (
        <footer>
            {/* Trust badges */}
            <div style={{ backgroundColor: C.bgAlt, borderTop: `1px solid ${C.borderLight}` }}>
                <div style={{ maxWidth: 1400, marginInline: "auto", paddingInline: 24, paddingBlock: 48 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }} className="sm-full">
                        {[
                            { Icon: Truck, title: "Free Delivery", desc: "On orders above Rs. 5,000" },
                            { Icon: ShieldCheck, title: "Authentic Guarantee", desc: "100% genuine luxury fragrances" },
                            { Icon: Headphones, title: "24/7 Support", desc: "We're always here to help" },
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center",
                                    gap: 12,
                                    padding: 16,
                                }}
                            >
                                <div style={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: "50%",
                                    border: `1px solid ${C.gold}`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                    <s.Icon size={22} style={{ color: C.gold }} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 style={{ color: C.text, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500, margin: 0 }}>{s.title}</h4>
                                    <p style={{ color: "#666", fontSize: 12, marginTop: 4 }}>{s.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main footer */}
            <div style={{ backgroundColor: "#111", color: "rgba(255,255,255,0.5)" }}>
                <div style={{ maxWidth: 1400, marginInline: "auto", paddingInline: 24, paddingTop: 64, paddingBottom: 48 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1.3fr", gap: 48 }} className="footer-grid">

                        <div>
                            <span style={{
                                fontFamily: "var(--font-playfair), Georgia, serif",
                                fontSize: 32,
                                letterSpacing: "0.35em",
                                color: C.gold,
                                fontWeight: 400,
                                paddingLeft: "0.35em",
                                display: "inline-block",
                                marginBottom: 16,
                            }}>
                                SILLAGE
                            </span>
                            <p style={{ color: "#ffffff", fontSize: 13, lineHeight: 1.8, maxWidth: 300 }}>
                                Crafting luxurious fragrances that tell stories of elegance, mystery, and timeless beauty.
                            </p>
                        </div>

                        <div>
                            <h4 style={headingStyle}>
                                Quick Links
                                <span style={headingAfter} />
                            </h4>
                            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                {[
                                    { href: "/shop", label: "Shop All" },
                                    { href: "/about", label: "About Us" },
                                    { href: "/contact", label: "Contact" },
                                ].map((l) => (
                                    <Link key={l.href} href={l.href} className="text-hover" style={linkStyle}>{l.label}</Link>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 style={headingStyle}>
                                Customer Care
                                <span style={headingAfter} />
                            </h4>
                            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                {[
                                    { href: "/shipping-returns", label: "Shipping & Returns" },
                                    { href: "#", label: "Privacy Policy" },
                                    { href: "#", label: "Terms & Conditions" },
                                    { href: "#", label: "FAQ" },
                                ].map((l) => (
                                    <Link key={l.label} href={l.href} className="text-hover" style={linkStyle}>{l.label}</Link>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 style={headingStyle}>
                                Get in Touch
                                <span style={headingAfter} />
                            </h4>
                            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                                    <MapPin size={15} style={{ color: C.gold, marginTop: 3, flexShrink: 0, opacity: 0.8 }} strokeWidth={1.5} />
                                    <span style={{ color: "#ffffff", fontSize: 13 }}>Islamabad, Pakistan</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <Phone size={15} style={{ color: C.gold, flexShrink: 0, opacity: 0.8 }} strokeWidth={1.5} />
                                    <span style={{ color: "#ffffff", fontSize: 13 }}>+92 300 123 4567</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <Mail size={15} style={{ color: C.gold, flexShrink: 0, opacity: 0.8 }} strokeWidth={1.5} />
                                    <span style={{ color: "#ffffff", fontSize: 13 }}>hello@sillage.com</span>
                                </div>
                            </div>

                            <div style={{ marginTop: 28 }}>
                                <p style={{ color: "#ffffff", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14, fontWeight: 400 }}>Newsletter</p>
                                <div style={{ display: "flex", gap: 0 }}>
                                    <input
                                        type="email"
                                        placeholder="Your email address"
                                        style={{
                                            flex: 1,
                                            backgroundColor: "rgba(255,255,255,0.05)",
                                            border: "1px solid rgba(255,255,255,0.12)",
                                            borderRight: "none",
                                            color: C.white,
                                            padding: "10px 14px",
                                            fontSize: 12,
                                            letterSpacing: "0.05em",
                                        }}
                                    />
                                    <button
                                        className="btn-gold"
                                        style={{
                                            backgroundColor: C.gold,
                                            color: C.white,
                                            padding: "10px 18px",
                                            fontSize: 11,
                                            letterSpacing: "0.1em",
                                            textTransform: "uppercase",
                                            border: "none",
                                            cursor: "pointer",
                                            transition: "background-color 0.3s",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="footer-bottom" style={{
                        maxWidth: 1400,
                        marginInline: "auto",
                        paddingInline: 24,
                        paddingBlock: 20,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                    }}>
                        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, letterSpacing: "0.05em", margin: 0 }}>
                            © 2026 Sillage Perfume. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
