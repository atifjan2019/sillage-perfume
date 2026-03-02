"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export default function AdminDashboard() {
    const [stats, setStats] = useState({ products: 0, categories: 0, orders: 0 });

    useEffect(() => {
        Promise.all([
            apiFetch("/admin/products?per_page=1"),
            apiFetch("/admin/categories"),
            apiFetch("/admin/orders?per_page=1"),
        ]).then(([p, c, o]) => {
            setStats({
                products: p.total || p.data?.length || 0,
                categories: c.data?.length || 0,
                orders: o.total || o.data?.length || 0,
            });
        }).catch(() => { });
    }, []);

    const cards = [
        { label: "Products", value: stats.products, icon: "🧴", color: "var(--gold)" },
        { label: "Categories", value: stats.categories, icon: "📂", color: "#22c55e" },
        { label: "Orders", value: stats.orders, icon: "📦", color: "#3b82f6" },
    ];

    return (
        <div>
            <h1 className="text-2xl font-light tracking-wide mb-8"
                style={{ fontFamily: "var(--font-cormorant)", color: "var(--cream)" }}>
                Dashboard
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {cards.map((card) => (
                    <div key={card.label} className="rounded-xl p-6"
                        style={{ backgroundColor: "var(--charcoal)", border: "1px solid rgba(255,255,255,0.05)" }}>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl">{card.icon}</span>
                            <span className="text-3xl font-light" style={{ fontFamily: "var(--font-cormorant)", color: card.color }}>
                                {card.value}
                            </span>
                        </div>
                        <p className="text-xs tracking-[0.15em] uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
                            {card.label}
                        </p>
                    </div>
                ))}
            </div>

            <div className="rounded-xl p-6" style={{ backgroundColor: "var(--charcoal)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <h2 className="text-sm font-medium mb-4" style={{ color: "var(--cream)" }}>Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                        { href: "/admin/products/new", label: "Add New Product" },
                        { href: "/admin/categories", label: "Manage Categories" },
                        { href: "/admin/orders", label: "View Orders" },
                    ].map((action) => (
                        <a key={action.href} href={action.href}
                            className="px-4 py-3 rounded-lg text-xs tracking-[0.1em] uppercase text-center transition-all duration-300"
                            style={{ backgroundColor: "rgba(201,169,110,0.08)", color: "var(--gold)", border: "1px solid rgba(201,169,110,0.15)" }}>
                            {action.label}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
