import { Metadata } from "next";
import { Truck, Undo2, Repeat } from "lucide-react";

export const metadata: Metadata = {
    title: "Shipping & Returns | Sillage Perfume",
    description: "Learn about Sillage Perfume's shipping and return policies.",
};

const sections = [
    {
        title: "Shipping",
        Icon: Truck,
        items: [
            "Free shipping on all orders over Rs. 5,000",
            "Standard delivery: 3-5 business days",
            "Express delivery available at checkout",
            "All orders carefully packaged with premium materials",
            "Tracking number provided via email",
        ],
    },
    {
        title: "Returns",
        Icon: Undo2,
        items: [
            "7-day return policy on all unused, sealed products",
            "Items must be in original packaging",
            "Contact our team to initiate a return",
            "Refunds processed within 5-7 business days",
            "Return shipping is the customer's responsibility",
        ],
    },
    {
        title: "Exchanges",
        Icon: Repeat,
        items: [
            "We offer exchanges for different fragrances",
            "Exchange requests within 7 days of delivery",
            "Product must be unused and sealed",
            "Free exchange shipping on orders over Rs. 5,000",
        ],
    },
];

export default function ShippingReturnsPage() {
    return (
        <>
            <section style={{ paddingBlock: 64, backgroundColor: "#f8f7f4" }}>
                <div style={{ maxWidth: 1400, marginInline: "auto", paddingInline: 24, textAlign: "center" }}>
                    <p style={{ color: "#c9a96e", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>Policies</p>
                    <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 44, fontWeight: 300, color: "#1a1a1a", letterSpacing: "0.04em", margin: 0 }}>
                        Shipping &amp; Returns
                    </h1>
                    <hr style={{ width: 64, height: 1, backgroundColor: "#c9a96e", marginTop: 16, marginInline: "auto", border: "none" }} />
                </div>
            </section>

            <section style={{ paddingBlock: 80, backgroundColor: "#ffffff" }}>
                <div style={{ maxWidth: 920, marginInline: "auto", paddingInline: 24, display: "flex", flexDirection: "column", gap: 56 }}>
                    {sections.map((section) => (
                        <div key={section.title}>
                            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                                <div style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid #c9a96e", display: "flex", alignItems: "center", justifyContent: "center", color: "#c9a96e" }}>
                                    <section.Icon size={20} strokeWidth={1.5} />
                                </div>
                                <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 26, fontWeight: 300, color: "#1a1a1a", letterSpacing: "0.04em", margin: 0 }}>
                                    {section.title}
                                </h2>
                            </div>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, paddingLeft: 60 }}>
                                {section.items.map((item) => (
                                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 12, color: "#555", fontSize: 14, lineHeight: 1.6 }}>
                                        <span style={{ color: "#c9a96e", marginTop: 2 }}>•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
