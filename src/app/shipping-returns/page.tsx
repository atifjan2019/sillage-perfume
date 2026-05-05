import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shipping & Returns | Sillage Perfume",
    description: "Learn about Sillage Perfume's shipping and return policies.",
};

export default function ShippingReturnsPage() {
    return (
        <div className="pt-20 sm:pt-24">
            <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold-dark)" }}>Policies</p>
                    <h1 className="text-4xl sm:text-5xl font-light tracking-wide mb-6"
                        style={{ fontFamily: "var(--font-cormorant)", color: "var(--cream)" }}>
                        Shipping & Returns
                    </h1>
                    <div className="w-16 h-px mx-auto" style={{ backgroundColor: "var(--gold)" }} />
                </div>

                <div className="space-y-12">
                    {[
                        {
                            title: "Shipping",
                            items: [
                                "Free shipping on all orders over Rs. 5,000",
                                "Standard delivery: 3-5 business days",
                                "Express delivery available at checkout",
                                "All orders are carefully packaged with premium materials",
                                "Tracking number provided via email",
                            ],
                        },
                        {
                            title: "Returns",
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
                            items: [
                                "We offer exchanges for different fragrances",
                                "Exchange requests within 7 days of delivery",
                                "Product must be unused and sealed",
                                "Free exchange shipping on orders over Rs. 5,000",
                            ],
                        },
                    ].map((section) => (
                        <div key={section.title}>
                            <h2 className="text-xl font-light tracking-wide mb-5"
                                style={{ fontFamily: "var(--font-cormorant)", color: "var(--gold)" }}>
                                {section.title}
                            </h2>
                            <ul className="space-y-3">
                                {section.items.map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                                        <span style={{ color: "var(--gold)" }}>•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
