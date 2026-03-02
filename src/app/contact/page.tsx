import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact | SWAN Perfumes",
    description: "Get in touch with SWAN Perfumes. We'd love to hear from you.",
};

export default function ContactPage() {
    return (
        <div className="pt-20 sm:pt-24">
            <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold-dark)" }}>Get in Touch</p>
                    <h1 className="text-4xl sm:text-5xl font-light tracking-wide mb-6"
                        style={{ fontFamily: "var(--font-cormorant)", color: "var(--cream)" }}>
                        Contact Us
                    </h1>
                    <div className="w-16 h-px mx-auto" style={{ backgroundColor: "var(--gold)" }} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Info */}
                    <div className="space-y-8">
                        {[
                            { label: "Email", value: "hello@swan.com", icon: "✉️" },
                            { label: "Phone", value: "+92 300 123 4567", icon: "📞" },
                            { label: "Address", value: "Islamabad, Pakistan", icon: "📍" },
                            { label: "Hours", value: "Mon-Sat, 10AM - 8PM", icon: "🕐" },
                        ].map((item) => (
                            <div key={item.label} className="flex items-start gap-4">
                                <span className="text-lg">{item.icon}</span>
                                <div>
                                    <p className="text-xs tracking-[0.15em] uppercase mb-1" style={{ color: "var(--gold)" }}>{item.label}</p>
                                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Form */}
                    <div className="rounded-xl p-6" style={{ backgroundColor: "var(--charcoal)", border: "1px solid rgba(255,255,255,0.05)" }}>
                        <div className="space-y-4">
                            <input placeholder="Your Name"
                                className="w-full px-4 py-3.5 rounded-xl text-sm outline-none placeholder:text-white/20"
                                style={{ backgroundColor: "rgba(255,255,255,0.03)", color: "var(--cream)", border: "1px solid rgba(255,255,255,0.08)" }} />
                            <input type="email" placeholder="Your Email"
                                className="w-full px-4 py-3.5 rounded-xl text-sm outline-none placeholder:text-white/20"
                                style={{ backgroundColor: "rgba(255,255,255,0.03)", color: "var(--cream)", border: "1px solid rgba(255,255,255,0.08)" }} />
                            <textarea placeholder="Your Message" rows={5}
                                className="w-full px-4 py-3.5 rounded-xl text-sm outline-none resize-none placeholder:text-white/20"
                                style={{ backgroundColor: "rgba(255,255,255,0.03)", color: "var(--cream)", border: "1px solid rgba(255,255,255,0.08)" }} />
                            <button className="w-full py-4 rounded-xl text-xs font-medium tracking-[0.15em] uppercase"
                                style={{ background: "linear-gradient(135deg, var(--gold-dark), var(--gold))", color: "#0a0a0a" }}>
                                Send Message
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
