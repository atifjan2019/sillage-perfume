"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Order } from "@/lib/types";

function formatPrice(p: string | number) { return `Rs. ${Number(p).toLocaleString()}`; }

const statusColors: Record<string, { bg: string; text: string }> = {
    pending_payment: { bg: "rgba(234,179,8,0.1)", text: "#eab308" },
    paid: { bg: "rgba(34,197,94,0.1)", text: "#22c55e" },
    cod_pending: { bg: "rgba(59,130,246,0.1)", text: "#3b82f6" },
    processing: { bg: "rgba(168,85,247,0.1)", text: "#a855f7" },
    shipped: { bg: "rgba(14,165,233,0.1)", text: "#0ea5e9" },
    delivered: { bg: "rgba(34,197,94,0.15)", text: "#22c55e" },
    canceled: { bg: "rgba(239,68,68,0.1)", text: "#ef4444" },
};

export default function AdminOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiFetch("/admin/orders?per_page=50")
            .then((d) => setOrders(d.data))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const updateStatus = async (id: number, status: string) => {
        try {
            const data = await apiFetch(`/admin/orders/${id}`, {
                method: "PATCH",
                body: JSON.stringify({ status }),
            });
            setOrders((prev) => prev.map((o) => (o.id === id ? data.data : o)));
        } catch { alert("Failed to update status"); }
    };

    return (
        <div>
            <h1 className="text-2xl font-light tracking-wide mb-8" style={{ fontFamily: "var(--font-cormorant)", color: "var(--cream)" }}>
                Orders
            </h1>

            {loading ? (
                <div className="text-center py-20">
                    <div className="animate-spin w-6 h-6 border-2 rounded-full mx-auto" style={{ borderColor: "var(--gold)", borderTopColor: "transparent" }} />
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-20 rounded-xl" style={{ backgroundColor: "var(--charcoal)" }}>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>No orders yet</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => {
                        const sc = statusColors[order.status] || statusColors.pending_payment;
                        return (
                            <div key={order.id} className="rounded-xl p-5"
                                style={{ backgroundColor: "var(--charcoal)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-medium" style={{ color: "var(--cream)" }}>#{order.order_no}</span>
                                            <span className="px-2 py-0.5 rounded text-[10px] tracking-wider uppercase"
                                                style={{ backgroundColor: sc.bg, color: sc.text }}>
                                                {order.status.replace(/_/g, " ")}
                                            </span>
                                            <span className="px-2 py-0.5 rounded text-[10px] tracking-wider uppercase"
                                                style={{ backgroundColor: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.4)" }}>
                                                {order.payment_method}
                                            </span>
                                        </div>
                                        <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                                            {order.customer_name} • {order.email} • {new Date(order.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span className="text-lg font-light" style={{ fontFamily: "var(--font-cormorant)", color: "var(--gold)" }}>
                                        {formatPrice(order.total)}
                                    </span>
                                </div>

                                {/* Items */}
                                <div className="mb-4 space-y-1">
                                    {order.items?.map((item) => (
                                        <div key={item.id} className="flex justify-between text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                                            <span>{item.name_snapshot} × {item.qty}</span>
                                            <span>{formatPrice(item.line_total)}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Status update */}
                                <div className="flex items-center gap-2 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                                    <span className="text-[10px] tracking-[0.1em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Update:</span>
                                    {["processing", "shipped", "delivered", "canceled"].map((s) => (
                                        <button key={s} onClick={() => updateStatus(order.id, s)}
                                            className="text-[10px] tracking-wider uppercase px-2 py-1 rounded transition-colors"
                                            style={{
                                                backgroundColor: order.status === s ? (statusColors[s]?.bg || "rgba(255,255,255,0.05)") : "rgba(255,255,255,0.03)",
                                                color: order.status === s ? (statusColors[s]?.text || "var(--cream)") : "rgba(255,255,255,0.4)",
                                            }}>
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
