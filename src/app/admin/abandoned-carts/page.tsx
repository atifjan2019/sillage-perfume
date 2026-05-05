"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { CartAbandonedIcon } from "@/components/Icons";

interface AbandonedCart {
    id: number;
    session_id: string;
    email: string | null;
    items: { product_id: number; qty: number; name_snapshot: string; price_snapshot: string }[];
    subtotal: string;
    last_updated: string;
}

function formatPrice(p: string | number) {
    return `Rs. ${Number(p).toLocaleString()}`;
}

function timeAgo(iso: string): string {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
}

export default function AbandonedCartsPage() {
    const [carts, setCarts] = useState<AbandonedCart[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiFetch("/admin/abandoned-carts")
            .then((d) => setCarts(d.data ?? []))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-light tracking-wide" style={{ fontFamily: "var(--font-playfair)", color: "var(--cream)" }}>
                    Abandoned Carts
                </h1>
                <span className="text-xs tracking-[0.15em] uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {carts.length} carts inactive 15+ min
                </span>
            </div>

            {loading ? (
                <div className="text-center py-20">
                    <div className="animate-spin w-6 h-6 border-2 rounded-full mx-auto" style={{ borderColor: "var(--gold)", borderTopColor: "transparent" }} />
                </div>
            ) : carts.length === 0 ? (
                <div className="text-center py-20 rounded-xl" style={{ backgroundColor: "var(--charcoal)" }}>
                    <span className="inline-flex" style={{ color: "rgba(255,255,255,0.2)" }}>
                        <CartAbandonedIcon size={40} />
                    </span>
                    <p className="text-sm mt-4" style={{ color: "rgba(255,255,255,0.4)" }}>No abandoned carts</p>
                    <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.25)" }}>Carts inactive for 15+ minutes will appear here</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {carts.map((cart) => (
                        <div key={cart.id} className="rounded-xl p-5"
                            style={{ backgroundColor: "var(--charcoal)", border: "1px solid rgba(255,255,255,0.05)" }}>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-sm font-medium" style={{ color: "var(--cream)" }}>
                                            #{cart.id}
                                        </span>
                                        <span className="px-2 py-0.5 rounded text-[10px] tracking-wider uppercase"
                                            style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444" }}>
                                            Abandoned
                                        </span>
                                    </div>
                                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                                        {cart.email ?? "Guest"} • Session {cart.session_id.slice(0, 8)}… • Updated {timeAgo(cart.last_updated)}
                                    </p>
                                </div>
                                <span className="text-lg font-light" style={{ fontFamily: "var(--font-playfair)", color: "var(--gold)" }}>
                                    {formatPrice(cart.subtotal)}
                                </span>
                            </div>

                            <div className="space-y-1">
                                {cart.items.map((item) => (
                                    <div key={item.product_id} className="flex justify-between text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                                        <span>{item.name_snapshot} × {item.qty}</span>
                                        <span>{formatPrice(parseFloat(item.price_snapshot) * item.qty)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
