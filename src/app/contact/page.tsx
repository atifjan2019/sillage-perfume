import { Metadata } from "next";
import Image from "next/image";
import { Mail, Phone, MapPin, Clock, AtSign, Send, MessageSquare } from "lucide-react";
import { C } from "@/styles/constants";

export const metadata: Metadata = {
    title: "Contact | Sillage Perfume",
    description: "Get in touch with Sillage Perfume — visit our atelier, send us a note, or reach our concierge for bespoke advice.",
};

const headingFont = "var(--font-playfair), Georgia, serif";

const channels = [
    { Icon: Mail, label: "Email", value: "hello@sillage.com", hint: "We reply within 24 hours" },
    { Icon: Phone, label: "Phone", value: "+92 300 123 4567", hint: "Mon–Sat · 10AM – 8PM" },
    { Icon: MapPin, label: "Atelier", value: "Islamabad, Pakistan", hint: "Visits by appointment" },
    { Icon: Clock, label: "Hours", value: "Mon–Sat, 10AM – 8PM", hint: "Closed on Sundays" },
];

const faqs = [
    {
        q: "Do you offer fragrance consultations?",
        a: "Yes. Our concierge offers complimentary one-on-one consultations — in person or by video — to help you discover a scent that suits you.",
    },
    {
        q: "Can I sample before I buy?",
        a: "Absolutely. We offer curated discovery sets and individual samples so you can live with a fragrance before committing.",
    },
    {
        q: "Do you ship internationally?",
        a: "We ship across Pakistan and to select international destinations. Contact our concierge for delivery to your country.",
    },
    {
        q: "Are your fragrances cruelty-free?",
        a: "Every Sillage composition is cruelty-free, and the majority of our materials are sustainably sourced from ethical partners worldwide.",
    },
];

export default function ContactPage() {
    const inputStyle: React.CSSProperties = {
        width: "100%",
        backgroundColor: "transparent",
        border: "none",
        borderBottom: `1px solid ${C.border}`,
        color: C.text,
        padding: "12px 2px",
        fontSize: 14,
        letterSpacing: "0.04em",
        outline: "none",
        fontFamily: "inherit",
    };

    const labelStyle: React.CSSProperties = {
        display: "block",
        color: C.textMuted,
        fontSize: 10,
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        marginBottom: 6,
    };

    return (
        <>
            {/* Hero */}
            <section style={{ position: "relative", height: "55vh", minHeight: 360, overflow: "hidden" }}>
                <Image src="/images/hero-collection.jpg" alt="Sillage atelier" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.7))" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 24 }}>
                    <div style={{ maxWidth: 720 }}>
                        <p style={{ color: C.gold, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", margin: 0, marginBottom: 18 }}>Get In Touch</p>
                        <h1 style={{ fontFamily: headingFont, fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 300, color: "#fff", letterSpacing: "0.04em", lineHeight: 1.1, margin: 0 }}>
                            We&apos;d love to <span style={{ color: C.gold, fontStyle: "italic" }}>hear from you</span>
                        </h1>
                        <div style={{ width: 56, height: 1, backgroundColor: C.gold, marginInline: "auto", marginTop: 24 }} />
                        <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 14, lineHeight: 1.85, marginTop: 22, fontWeight: 300, maxWidth: 540, marginInline: "auto" }}>
                            For bespoke consultations, press, or simply to share a note — our team is here.
                        </p>
                    </div>
                </div>
            </section>

            {/* Channel cards */}
            <section style={{ paddingBlock: 80, backgroundColor: C.bg }}>
                <div style={{ maxWidth: 1200, marginInline: "auto", paddingInline: 24 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="sm-full grid-sm-2">
                        {channels.map((c) => (
                            <div
                                key={c.label}
                                className="border-hover"
                                style={{
                                    border: `1px solid ${C.borderLight}`,
                                    padding: "32px 24px",
                                    textAlign: "center",
                                    transition: "border-color 0.3s",
                                    backgroundColor: C.bg,
                                }}
                            >
                                <div style={{ width: 52, height: 52, borderRadius: "50%", border: `1px solid ${C.gold}`, display: "flex", alignItems: "center", justifyContent: "center", color: C.gold, marginInline: "auto", marginBottom: 18 }}>
                                    <c.Icon size={20} strokeWidth={1.4} />
                                </div>
                                <p style={{ color: C.gold, fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", margin: 0, marginBottom: 8 }}>{c.label}</p>
                                <p style={{ color: C.text, fontSize: 14, fontWeight: 500, margin: 0, letterSpacing: "0.03em" }}>{c.value}</p>
                                <p style={{ color: C.textLight, fontSize: 11, marginTop: 6, letterSpacing: "0.05em" }}>{c.hint}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Form + side panel */}
            <section style={{ paddingBlock: 96, backgroundColor: C.bgAlt }}>
                <div style={{ maxWidth: 1200, marginInline: "auto", paddingInline: 24 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 0, backgroundColor: C.bg, border: `1px solid ${C.borderLight}` }} className="sm-full">
                        {/* Side panel */}
                        <div style={{ position: "relative", padding: "56px 44px", backgroundColor: "#111", color: "#fff", overflow: "hidden" }}>
                            <div style={{ position: "absolute", top: -80, right: -80, width: 240, height: 240, borderRadius: "50%", border: `1px solid rgba(201,169,110,0.2)` }} />
                            <div style={{ position: "absolute", bottom: -100, left: -100, width: 280, height: 280, borderRadius: "50%", border: `1px solid rgba(201,169,110,0.12)` }} />

                            <div style={{ position: "relative" }}>
                                <p style={{ color: C.gold, fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", margin: 0, marginBottom: 14 }}>Concierge</p>
                                <h2 style={{ fontFamily: headingFont, fontSize: 32, fontWeight: 300, color: "#fff", letterSpacing: "0.03em", lineHeight: 1.2, margin: 0 }}>
                                    A word, a question,<br />a <span style={{ fontStyle: "italic", color: C.gold }}>memory.</span>
                                </h2>
                                <div style={{ width: 40, height: 1, backgroundColor: C.gold, marginBlock: 24 }} />
                                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.85, fontWeight: 300, marginBottom: 32 }}>
                                    Whether you&apos;re searching for a signature scent, planning a gift, or simply curious about our craft — we&apos;re happy to help.
                                </p>

                                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                        <Mail size={16} style={{ color: C.gold }} strokeWidth={1.5} />
                                        <span style={{ color: "#fff", fontSize: 13, letterSpacing: "0.04em" }}>hello@sillage.com</span>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                        <Phone size={16} style={{ color: C.gold }} strokeWidth={1.5} />
                                        <span style={{ color: "#fff", fontSize: 13, letterSpacing: "0.04em" }}>+92 300 123 4567</span>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                        <AtSign size={16} style={{ color: C.gold }} strokeWidth={1.5} />
                                        <span style={{ color: "#fff", fontSize: 13, letterSpacing: "0.04em" }}>@sillage.perfume</span>
                                    </div>
                                </div>

                                <div style={{ marginTop: 56, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", margin: 0 }}>Atelier</p>
                                    <p style={{ color: "#fff", fontSize: 14, marginTop: 8, lineHeight: 1.7 }}>
                                        Islamabad, Pakistan<br />
                                        <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>Private visits by appointment</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div style={{ padding: "56px 44px" }}>
                            <p style={{ color: C.gold, fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", margin: 0, marginBottom: 14 }}>Send a Note</p>
                            <h2 style={{ fontFamily: headingFont, fontSize: 30, fontWeight: 300, color: C.text, letterSpacing: "0.03em", lineHeight: 1.2, margin: 0 }}>
                                Write to us
                            </h2>
                            <div style={{ width: 40, height: 1, backgroundColor: C.gold, marginBlock: 24 }} />

                            <form style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="sm-full">
                                    <div>
                                        <label style={labelStyle}>First Name</label>
                                        <input style={inputStyle} placeholder="Jane" />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Last Name</label>
                                        <input style={inputStyle} placeholder="Doe" />
                                    </div>
                                </div>
                                <div>
                                    <label style={labelStyle}>Email</label>
                                    <input type="email" style={inputStyle} placeholder="you@example.com" />
                                </div>
                                <div>
                                    <label style={labelStyle}>Subject</label>
                                    <input style={inputStyle} placeholder="How can we help?" />
                                </div>
                                <div>
                                    <label style={labelStyle}>Message</label>
                                    <textarea
                                        rows={5}
                                        style={{ ...inputStyle, resize: "none", paddingTop: 12 }}
                                        placeholder="Tell us a little about what you have in mind…"
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="btn-gold"
                                    style={{
                                        marginTop: 8,
                                        backgroundColor: C.gold,
                                        color: "#fff",
                                        border: "none",
                                        padding: "16px 28px",
                                        fontSize: 11,
                                        letterSpacing: "0.3em",
                                        textTransform: "uppercase",
                                        fontWeight: 500,
                                        cursor: "pointer",
                                        transition: "background-color 0.3s",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 12,
                                        alignSelf: "flex-start",
                                    }}
                                >
                                    Send Message <Send size={14} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section style={{ paddingBlock: 96, backgroundColor: C.bg }}>
                <div style={{ maxWidth: 960, marginInline: "auto", paddingInline: 24 }}>
                    <div style={{ textAlign: "center", marginBottom: 56 }}>
                        <p style={{ color: C.gold, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>Common Questions</p>
                        <h2 style={{ fontFamily: headingFont, fontSize: "clamp(28px, 3.4vw, 40px)", fontWeight: 300, color: C.text, letterSpacing: "0.03em", margin: 0 }}>
                            Before you write
                        </h2>
                        <div style={{ width: 48, height: 1, backgroundColor: C.gold, marginInline: "auto", marginTop: 18 }} />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="sm-full">
                        {faqs.map((f) => (
                            <div key={f.q} style={{ borderTop: `1px solid ${C.borderLight}`, paddingTop: 24 }}>
                                <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                                    <MessageSquare size={16} style={{ color: C.gold, marginTop: 4, flexShrink: 0 }} strokeWidth={1.5} />
                                    <div>
                                        <h3 style={{ fontFamily: headingFont, fontSize: 17, fontWeight: 500, color: C.text, margin: 0, marginBottom: 8, letterSpacing: "0.02em" }}>{f.q}</h3>
                                        <p style={{ color: C.textMuted, fontSize: 13, lineHeight: 1.8, margin: 0 }}>{f.a}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
