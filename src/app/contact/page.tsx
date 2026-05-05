import { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
    title: "Contact | Sillage Perfume",
    description: "Get in touch with Sillage Perfume. We'd love to hear from you.",
};

export default function ContactPage() {
    const items = [
        { label: "Email", value: "hello@sillage.com", Icon: Mail },
        { label: "Phone", value: "+92 300 123 4567", Icon: Phone },
        { label: "Address", value: "Islamabad, Pakistan", Icon: MapPin },
        { label: "Hours", value: "Mon-Sat, 10AM - 8PM", Icon: Clock },
    ];

    const inputStyle: React.CSSProperties = {
        width: "100%",
        backgroundColor: "#fff",
        border: "1px solid #e5e5e5",
        color: "#1a1a1a",
        padding: "12px 16px",
        fontSize: 14,
        letterSpacing: "0.05em",
        outline: "none",
    };

    return (
        <>
            <section style={{ paddingBlock: 64, backgroundColor: "#f8f7f4" }}>
                <div style={{ maxWidth: 1400, marginInline: "auto", paddingInline: 24, textAlign: "center" }}>
                    <p style={{ color: "#c9a96e", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>Get in Touch</p>
                    <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 44, fontWeight: 300, color: "#1a1a1a", letterSpacing: "0.04em", margin: 0 }}>
                        Contact Us
                    </h1>
                    <hr style={{ width: 64, height: 1, backgroundColor: "#c9a96e", marginTop: 16, marginInline: "auto", border: "none" }} />
                </div>
            </section>

            <section style={{ paddingBlock: 80, backgroundColor: "#ffffff" }}>
                <div style={{ maxWidth: 1100, marginInline: "auto", paddingInline: 24 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 64 }} className="lg-grid-2 sm-full">
                        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                            {items.map((it) => (
                                <div key={it.label} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                                    <div style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid #c9a96e", display: "flex", alignItems: "center", justifyContent: "center", color: "#c9a96e", flexShrink: 0 }}>
                                        <it.Icon size={18} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <p style={{ color: "#c9a96e", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", margin: 0, marginBottom: 4 }}>{it.label}</p>
                                        <p style={{ color: "#555", fontSize: 14, margin: 0 }}>{it.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <form style={{ backgroundColor: "#f8f7f4", padding: 32, display: "flex", flexDirection: "column", gap: 14 }}>
                            <input placeholder="Your Name" style={inputStyle} />
                            <input type="email" placeholder="Your Email" style={inputStyle} />
                            <textarea placeholder="Your Message" rows={6} style={{ ...inputStyle, resize: "none", fontFamily: "inherit" }} />
                            <button type="button" className="btn-gold" style={{ marginTop: 8, backgroundColor: "#c9a96e", color: "#fff", border: "none", padding: "14px 0", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500, cursor: "pointer", transition: "background-color 0.3s" }}>
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
