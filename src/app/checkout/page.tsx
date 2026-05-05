"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { apiFetch } from "@/lib/api";
import { Banknote, CreditCard } from "lucide-react";
import { C, container } from "@/styles/constants";

function formatPrice(n: number) {
    return `Rs. ${n.toLocaleString()}`;
}

export default function CheckoutPage() {
    const router = useRouter();
    const { items, subtotal, clearCart, sessionId } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<"cod" | "stripe">("cod");
    const [form, setForm] = useState({
        customer_name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postal_code: "",
        notes: "",
    });

    const shipping = subtotal >= 5000 ? 0 : 500;
    const total = subtotal + shipping;

    const updateForm = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const orderItems = items.map((i) => ({ product_id: i.product.id, qty: i.qty }));
        try {
            if (paymentMethod === "cod") {
                const data = await apiFetch("/checkout/cod", {
                    method: "POST",
                    body: JSON.stringify({ ...form, items: orderItems, session_id: sessionId }),
                });
                clearCart();
                router.push(`/checkout/success?order=${data.data.order_no}`);
            } else {
                const data = await apiFetch("/checkout/stripe-intent", {
                    method: "POST",
                    body: JSON.stringify({ ...form, items: orderItems, session_id: sessionId }),
                });
                alert(`Stripe PaymentIntent created: ${data.client_secret}\nOrder: ${data.order_no}\n\nIn production, Stripe Elements would handle payment confirmation.`);
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Checkout failed");
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <section style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 80 }}>
                <p style={{ color: C.textMuted, fontSize: 14 }}>Your cart is empty.</p>
            </section>
        );
    }

    const inputStyle: React.CSSProperties = {
        width: "100%",
        backgroundColor: "#fff",
        color: C.text,
        border: `1px solid ${C.border}`,
        padding: "12px 14px",
        fontSize: 14,
        letterSpacing: "0.03em",
        outline: "none",
    };

    const sectionTitle: React.CSSProperties = {
        color: C.gold,
        fontSize: 11,
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        margin: 0,
        marginBottom: 20,
        fontWeight: 500,
    };

    return (
        <section style={{ paddingBlock: 64, backgroundColor: C.bg }}>
            <div style={container}>
                <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 36, fontWeight: 300, color: C.text, letterSpacing: "0.04em", margin: 0, marginBottom: 32 }}>
                    Checkout
                </h1>

                {error && (
                    <div style={{ marginBottom: 24, padding: "14px 18px", border: "1px solid rgba(220,38,38,0.3)", backgroundColor: "rgba(220,38,38,0.06)", color: "#b91c1c", fontSize: 13 }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 40 }} className="lg-grid-2 sm-full">
                        {/* Form */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                            <div>
                                <h2 style={sectionTitle}>Contact Information</h2>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                    <input required placeholder="Full Name" value={form.customer_name} onChange={(e) => updateForm("customer_name", e.target.value)} style={inputStyle} autoComplete="name" />
                                    <input required type="email" placeholder="Email Address" value={form.email} onChange={(e) => updateForm("email", e.target.value)} style={inputStyle} autoComplete="email" />
                                    <input required placeholder="Phone Number" value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} style={{ ...inputStyle, gridColumn: "1 / -1" }} autoComplete="tel" />
                                </div>
                            </div>

                            <div>
                                <h2 style={sectionTitle}>Shipping Address</h2>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                    <textarea required placeholder="Street Address" value={form.address} onChange={(e) => updateForm("address", e.target.value)} style={{ ...inputStyle, gridColumn: "1 / -1", resize: "none", height: 80, fontFamily: "inherit" }} autoComplete="street-address" />
                                    <input required placeholder="City" value={form.city} onChange={(e) => updateForm("city", e.target.value)} style={inputStyle} autoComplete="address-level2" />
                                    <input required placeholder="Postal Code" value={form.postal_code} onChange={(e) => updateForm("postal_code", e.target.value)} style={inputStyle} autoComplete="postal-code" />
                                </div>
                            </div>

                            <div>
                                <h2 style={sectionTitle}>Payment Method</h2>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                    {[
                                        { value: "cod" as const, label: "Cash on Delivery", Icon: Banknote },
                                        { value: "stripe" as const, label: "Credit / Debit Card", Icon: CreditCard },
                                    ].map((method) => {
                                        const Icon = method.Icon;
                                        const active = paymentMethod === method.value;
                                        return (
                                            <button
                                                key={method.value}
                                                type="button"
                                                onClick={() => setPaymentMethod(method.value)}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 14,
                                                    padding: 16,
                                                    backgroundColor: active ? "rgba(201,169,110,0.08)" : "#fff",
                                                    border: active ? `2px solid ${C.gold}` : `1px solid ${C.border}`,
                                                    cursor: "pointer",
                                                    transition: "all 0.3s",
                                                    color: active ? C.gold : C.text,
                                                    textAlign: "left",
                                                }}
                                            >
                                                <Icon size={22} strokeWidth={1.5} />
                                                <span style={{ fontSize: 13, color: C.text }}>{method.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <textarea placeholder="Order Notes (optional)" value={form.notes} onChange={(e) => updateForm("notes", e.target.value)} style={{ ...inputStyle, resize: "none", height: 80, fontFamily: "inherit" }} />
                            </div>
                        </div>

                        {/* Summary */}
                        <aside style={{ alignSelf: "start", backgroundColor: C.bgAlt, border: `1px solid ${C.borderLight}`, padding: 28, position: "sticky", top: 100 }}>
                            <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 22, fontWeight: 300, color: C.text, letterSpacing: "0.04em", marginTop: 0, marginBottom: 20 }}>
                                Order Summary
                            </h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                                {items.map((item) => (
                                    <div key={item.product.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                                        <span style={{ color: C.textMuted }}>{item.product.name} × {item.qty}</span>
                                        <span style={{ color: C.text }}>{formatPrice(parseFloat(item.product.sale_price ?? item.product.price) * item.qty)}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                                    <span style={{ color: C.textMuted }}>Subtotal</span>
                                    <span style={{ color: C.text }}>{formatPrice(subtotal)}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                                    <span style={{ color: C.textMuted }}>Shipping</span>
                                    <span style={{ color: shipping === 0 ? "#22c55e" : C.text }}>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", paddingBlock: 16, marginTop: 8, borderTop: `1px solid ${C.border}`, marginBottom: 20 }}>
                                <span style={{ fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: C.text }}>Total</span>
                                <span style={{ color: C.gold, fontSize: 20, fontWeight: 600 }}>{formatPrice(total)}</span>
                            </div>
                            <button type="submit" disabled={loading} className="btn-gold" style={{ width: "100%", backgroundColor: C.gold, color: "#fff", border: "none", padding: "14px 0", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500, cursor: "pointer", opacity: loading ? 0.6 : 1, transition: "background-color 0.3s" }}>
                                {loading ? "Processing…" : paymentMethod === "cod" ? "Place Order (COD)" : "Pay Now"}
                            </button>
                        </aside>
                    </div>
                </form>
            </div>
        </section>
    );
}
