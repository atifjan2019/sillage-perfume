"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { Product } from "@/lib/types";

function formatPrice(p: string | number) { return `Rs. ${Number(p).toLocaleString()}`; }

export default function AdminProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiFetch("/admin/products?per_page=50")
            .then((d) => setProducts(d.data))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this product?")) return;
        try {
            await apiFetch(`/admin/products/${id}`, { method: "DELETE" });
            setProducts((p) => p.filter((x) => x.id !== id));
        } catch { alert("Failed to delete"); }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-light tracking-wide" style={{ fontFamily: "var(--font-cormorant)", color: "var(--cream)" }}>
                    Products
                </h1>
                <Link href="/admin/products/new"
                    className="px-5 py-2.5 rounded-lg text-xs font-medium tracking-[0.1em] uppercase"
                    style={{ backgroundColor: "var(--gold)", color: "#0a0a0a" }}>
                    + Add Product
                </Link>
            </div>

            {loading ? (
                <div className="text-center py-20">
                    <div className="animate-spin w-6 h-6 border-2 rounded-full mx-auto" style={{ borderColor: "var(--gold)", borderTopColor: "transparent" }} />
                </div>
            ) : (
                <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "var(--charcoal)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                    {["Product", "Category", "Price", "Stock", "Status", "Actions"].map((h) => (
                                        <th key={h} className="text-left px-4 py-3 text-[10px] tracking-[0.15em] uppercase font-medium"
                                            style={{ color: "rgba(255,255,255,0.3)" }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((p) => (
                                    <tr key={p.id} className="transition-colors" style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                                        <td className="px-4 py-3">
                                            <p className="text-sm font-medium" style={{ color: "var(--cream)" }}>{p.name}</p>
                                            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>{p.sku}</p>
                                        </td>
                                        <td className="px-4 py-3 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                                            {p.category?.name || "—"}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-xs" style={{ color: "var(--gold)" }}>{formatPrice(p.sale_price || p.price)}</span>
                                            {p.sale_price && <span className="text-[10px] ml-1 line-through" style={{ color: "rgba(255,255,255,0.3)" }}>{formatPrice(p.price)}</span>}
                                        </td>
                                        <td className="px-4 py-3 text-xs" style={{ color: p.stock > 10 ? "#22c55e" : p.stock > 0 ? "#eab308" : "#ef4444" }}>
                                            {p.stock}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="px-2 py-1 rounded text-[10px] tracking-wider uppercase"
                                                style={{ backgroundColor: p.status === "active" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", color: p.status === "active" ? "#22c55e" : "#ef4444" }}>
                                                {p.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                <Link href={`/product/${p.slug}`} className="text-[10px] tracking-wider uppercase px-2 py-1 rounded"
                                                    style={{ color: "rgba(255,255,255,0.4)", backgroundColor: "rgba(255,255,255,0.03)" }}>View</Link>
                                                <button onClick={() => handleDelete(p.id)} className="text-[10px] tracking-wider uppercase px-2 py-1 rounded"
                                                    style={{ color: "#fca5a5", backgroundColor: "rgba(220,38,38,0.08)" }}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
