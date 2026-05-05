"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { apiFetch } from "@/lib/api";
import { CashIcon, CardIcon } from "@/components/Icons";

function formatPrice(n: number) {
    return `Rs. ${n.toLocaleString()}`;
}

export default function CheckoutPage() {
    const router = useRouter();
    const { items, subtotal, clearCart } = useCart();
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

        const orderItems = items.map((i) => ({
            product_id: i.product.id,
            qty: i.qty,
        }));

        try {
            if (paymentMethod === "cod") {
                const data = await apiFetch("/checkout/cod", {
                    method: "POST",
                    body: JSON.stringify({ ...form, items: orderItems }),
                });
                clearCart();
                router.push(`/checkout/success?order=${data.data.order_no}`);
            } else {
                // Stripe flow
                const data = await apiFetch("/checkout/stripe-intent", {
                    method: "POST",
                    body: JSON.stringify({ ...form, items: orderItems }),
                });
                // In production, use Stripe.js to confirm the payment
                alert(`Stripe PaymentIntent created: ${data.client_secret}\nOrder: ${data.order_no}\n\nIn production, Stripe Elements would handle payment confirmation.`);
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Checkout failed";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center pt-20">
                <p className="text-lg mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>Your cart is empty</p>
            </div>
        );
    }

    const inputStyle = {
        backgroundColor: "var(--charcoal)",
        color: "var(--cream)",
        border: "1px solid rgba(255,255,255,0.08)",
    };

    return (
        <div className="pt-20 sm:pt-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-light tracking-wide mb-10"
                    style={{ fontFamily: "var(--font-cormorant)", color: "var(--cream)" }}>
                    Checkout
                </h1>

                {error && (
                    <div className="mb-6 px-5 py-3.5 rounded-lg border text-sm"
                        style={{ backgroundColor: "rgba(220,38,38,0.08)", borderColor: "rgba(220,38,38,0.2)", color: "#fca5a5" }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Form */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Contact */}
                            <div>
                                <h2 className="text-xs tracking-[0.2em] uppercase mb-5 font-medium" style={{ color: "var(--gold)" }}>
                                    Contact Information
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input required placeholder="Full Name" value={form.customer_name}
                                        onChange={(e) => updateForm("customer_name", e.target.value)}
                                        className="px-4 py-3.5 rounded-xl text-sm outline-none focus:ring-1 placeholder:text-white/20"
                                        style={{ ...inputStyle, "--tw-ring-color": "var(--gold)" } as React.CSSProperties} />
                                    <input required type="email" placeholder="Email Address" value={form.email}
                                        onChange={(e) => updateForm("email", e.target.value)}
                                        className="px-4 py-3.5 rounded-xl text-sm outline-none focus:ring-1 placeholder:text-white/20"
                                        style={{ ...inputStyle, "--tw-ring-color": "var(--gold)" } as React.CSSProperties} />
                                    <input required placeholder="Phone Number" value={form.phone}
                                        onChange={(e) => updateForm("phone", e.target.value)}
                                        className="sm:col-span-2 px-4 py-3.5 rounded-xl text-sm outline-none focus:ring-1 placeholder:text-white/20"
                                        style={{ ...inputStyle, "--tw-ring-color": "var(--gold)" } as React.CSSProperties} />
                                </div>
                            </div>

                            {/* Shipping */}
                            <div>
                                <h2 className="text-xs tracking-[0.2em] uppercase mb-5 font-medium" style={{ color: "var(--gold)" }}>
                                    Shipping Address
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <textarea required placeholder="Street Address" value={form.address}
                                        onChange={(e) => updateForm("address", e.target.value)}
                                        className="sm:col-span-2 px-4 py-3.5 rounded-xl text-sm outline-none focus:ring-1 placeholder:text-white/20 resize-none h-20"
                                        style={{ ...inputStyle, "--tw-ring-color": "var(--gold)" } as React.CSSProperties} />
                                    <input required placeholder="City" value={form.city}
                                        onChange={(e) => updateForm("city", e.target.value)}
                                        className="px-4 py-3.5 rounded-xl text-sm outline-none focus:ring-1 placeholder:text-white/20"
                                        style={{ ...inputStyle, "--tw-ring-color": "var(--gold)" } as React.CSSProperties} />
                                    <input required placeholder="Postal Code" value={form.postal_code}
                                        onChange={(e) => updateForm("postal_code", e.target.value)}
                                        className="px-4 py-3.5 rounded-xl text-sm outline-none focus:ring-1 placeholder:text-white/20"
                                        style={{ ...inputStyle, "--tw-ring-color": "var(--gold)" } as React.CSSProperties} />
                                </div>
                            </div>

                            {/* Payment */}
                            <div>
                                <h2 className="text-xs tracking-[0.2em] uppercase mb-5 font-medium" style={{ color: "var(--gold)" }}>
                                    Payment Method
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { value: "cod" as const, label: "Cash on Delivery", Icon: CashIcon },
                                        { value: "stripe" as const, label: "Credit / Debit Card", Icon: CardIcon },
                                    ].map((method) => {
                                        const Icon = method.Icon;
                                        return (
                                            <button key={method.value} type="button"
                                                onClick={() => setPaymentMethod(method.value)}
                                                className="flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300"
                                                style={{
                                                    backgroundColor: "var(--charcoal)",
                                                    border: paymentMethod === method.value ? "2px solid var(--gold)" : "1px solid rgba(255,255,255,0.08)",
                                                    boxShadow: paymentMethod === method.value ? "0 0 0 3px rgba(201,169,110,0.1)" : "none",
                                                    color: paymentMethod === method.value ? "var(--gold)" : "rgba(255,255,255,0.6)",
                                                }}>
                                                <Icon size={22} />
                                                <span className="text-sm" style={{ color: "var(--cream)" }}>{method.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Notes */}
                            <div>
                                <textarea placeholder="Order Notes (optional)" value={form.notes}
                                    onChange={(e) => updateForm("notes", e.target.value)}
                                    className="w-full px-4 py-3.5 rounded-xl text-sm outline-none focus:ring-1 placeholder:text-white/20 resize-none h-20"
                                    style={{ ...inputStyle, "--tw-ring-color": "var(--gold)" } as React.CSSProperties} />
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="h-fit rounded-xl p-6 sticky top-28"
                            style={{ backgroundColor: "var(--charcoal)", border: "1px solid rgba(255,255,255,0.05)" }}>
                            <h2 className="text-lg font-light tracking-wide mb-6"
                                style={{ fontFamily: "var(--font-cormorant)", color: "var(--cream)" }}>
                                Order Summary
                            </h2>
                            <div className="space-y-3 mb-4">
                                {items.map((item) => (
                                    <div key={item.product.id} className="flex justify-between text-xs">
                                        <span style={{ color: "rgba(255,255,255,0.5)" }}>
                                            {item.product.name} × {item.qty}
                                        </span>
                                        <span style={{ color: "var(--cream)" }}>
                                            {formatPrice(parseFloat(item.product.sale_price || item.product.price) * item.qty)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-3 pt-4 mb-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                                <div className="flex justify-between text-sm">
                                    <span style={{ color: "rgba(255,255,255,0.5)" }}>Subtotal</span>
                                    <span style={{ color: "var(--cream)" }}>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span style={{ color: "rgba(255,255,255,0.5)" }}>Shipping</span>
                                    <span style={{ color: shipping === 0 ? "#22c55e" : "var(--cream)" }}>
                                        {shipping === 0 ? "Free" : formatPrice(shipping)}
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-between text-base font-medium pt-4 mb-6"
                                style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                                <span style={{ color: "var(--cream)" }}>Total</span>
                                <span style={{ color: "var(--gold)" }}>{formatPrice(total)}</span>
                            </div>
                            <button type="submit" disabled={loading}
                                className="w-full py-4 rounded-xl text-xs font-medium tracking-[0.15em] uppercase transition-all duration-500 disabled:opacity-50"
                                style={{
                                    background: "linear-gradient(135deg, var(--gold-dark), var(--gold))",
                                    color: "#0a0a0a",
                                    boxShadow: "0 4px 20px rgba(201,169,110,0.25)",
                                }}>
                                {loading ? "Processing..." : paymentMethod === "cod" ? "Place Order (COD)" : "Pay Now"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
