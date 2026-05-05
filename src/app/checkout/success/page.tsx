"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Check } from "lucide-react";
import { C } from "@/styles/constants";

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderNo = searchParams.get("order");

    return (
        <section style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px", backgroundColor: C.bg, textAlign: "center" }}>
            <div style={{ maxWidth: 460 }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", marginInline: "auto", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(34,197,94,0.1)", border: "2px solid rgba(34,197,94,0.4)", color: "#22c55e" }}>
                    <Check size={36} strokeWidth={1.6} />
                </div>
                <p style={{ color: C.gold, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 8 }}>Order Confirmed</p>
                <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 36, fontWeight: 300, color: C.text, letterSpacing: "0.04em", margin: 0, marginBottom: 12 }}>
                    Thank You for Your Order
                </h1>
                {orderNo && (
                    <p style={{ color: C.gold, fontSize: 14, letterSpacing: "0.1em", marginBottom: 12 }}>
                        Order #{orderNo}
                    </p>
                )}
                <p style={{ color: C.textMuted, fontSize: 14, marginBottom: 32, lineHeight: 1.7 }}>
                    A confirmation has been sent to your email. We will let you know once your order ships.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
                    <Link href="/shop" className="btn-gold" style={{ display: "inline-block", backgroundColor: C.gold, color: "#fff", padding: "14px 32px", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none", transition: "background-color 0.3s" }}>
                        Continue Shopping
                    </Link>
                    <Link href="/" className="btn-outline" style={{ display: "inline-block", border: `1px solid ${C.gold}`, color: C.gold, padding: "14px 32px", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none", transition: "all 0.3s" }}>
                        Back to Home
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default function CheckoutSuccessPage() {
    return (
        <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
            <SuccessContent />
        </Suspense>
    );
}
