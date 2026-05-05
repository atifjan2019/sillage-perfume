"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import {
    BottleIcon,
    FolderIcon,
    PackageIcon,
    CartAbandonedIcon,
    SettingsIcon,
    SeoIcon,
} from "@/components/Icons";

type StatTile = {
    label: string;
    value: number;
    href: string;
    Icon: React.ComponentType<{ size?: number }>;
    accent: string;
};

export default function AdminDashboard() {
    const [stats, setStats] = useState({ products: 0, categories: 0, orders: 0, abandonedCarts: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            apiFetch("/admin/products?per_page=1").catch(() => ({ total: 0 })),
            apiFetch("/admin/categories").catch(() => ({ data: [] })),
            apiFetch("/admin/orders?per_page=1").catch(() => ({ total: 0 })),
            apiFetch("/admin/abandoned-carts").catch(() => ({ total: 0 })),
        ]).then(([p, c, o, ac]) => {
            setStats({
                products: p.total ?? p.data?.length ?? 0,
                categories: c.data?.length ?? 0,
                orders: o.total ?? o.data?.length ?? 0,
                abandonedCarts: ac.total ?? ac.data?.length ?? 0,
            });
        }).finally(() => setLoading(false));
    }, []);

    const tiles: StatTile[] = [
        { label: "Products", value: stats.products, href: "/admin/products", Icon: BottleIcon, accent: "var(--gold)" },
        { label: "Categories", value: stats.categories, href: "/admin/categories", Icon: FolderIcon, accent: "#22c55e" },
        { label: "Orders", value: stats.orders, href: "/admin/orders", Icon: PackageIcon, accent: "#3b82f6" },
        { label: "Abandoned Carts", value: stats.abandonedCarts, href: "/admin/abandoned-carts", Icon: CartAbandonedIcon, accent: "#ef4444" },
    ];

    const settingsLinks = [
        { href: "/admin/settings/site", label: "Site Settings", description: "Brand name, contact, shipping", Icon: SettingsIcon },
        { href: "/admin/settings/seo", label: "SEO Settings", description: "Meta tags, analytics, social", Icon: SeoIcon },
    ];

    return (
        <div>
            <h1 className="text-2xl font-light tracking-wide mb-8"
                style={{ fontFamily: "var(--font-cormorant)", color: "var(--cream)" }}>
                Dashboard
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {tiles.map((tile) => {
                    const Icon = tile.Icon;
                    return (
                        <Link key={tile.label} href={tile.href} className="rounded-xl p-6 transition-all duration-300 hover:translate-y-[-2px]"
                            style={{ backgroundColor: "var(--charcoal)", border: "1px solid rgba(255,255,255,0.05)" }}>
                            <div className="flex items-center justify-between mb-4">
                                <span style={{ color: tile.accent }}>
                                    <Icon size={22} />
                                </span>
                                <span className="text-3xl font-light" style={{ fontFamily: "var(--font-cormorant)", color: tile.accent }}>
                                    {loading ? "—" : tile.value}
                                </span>
                            </div>
                            <p className="text-xs tracking-[0.15em] uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
                                {tile.label}
                            </p>
                        </Link>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
                {settingsLinks.map((link) => {
                    const Icon = link.Icon;
                    return (
                        <Link key={link.href} href={link.href}
                            className="rounded-xl p-5 flex items-center gap-4 transition-all duration-300 hover:translate-y-[-2px]"
                            style={{ backgroundColor: "var(--charcoal)", border: "1px solid rgba(255,255,255,0.05)" }}>
                            <span className="w-12 h-12 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: "rgba(201,169,110,0.08)", color: "var(--gold)" }}>
                                <Icon size={20} />
                            </span>
                            <div>
                                <p className="text-sm font-medium" style={{ color: "var(--cream)" }}>{link.label}</p>
                                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{link.description}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="rounded-xl p-6" style={{ backgroundColor: "var(--charcoal)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <h2 className="text-sm font-medium mb-4" style={{ color: "var(--cream)" }}>Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                        { href: "/admin/products/new", label: "Add New Product" },
                        { href: "/admin/categories", label: "Manage Categories" },
                        { href: "/admin/orders", label: "View Orders" },
                    ].map((action) => (
                        <Link key={action.href} href={action.href}
                            className="px-4 py-3 rounded-lg text-xs tracking-[0.1em] uppercase text-center transition-all duration-300"
                            style={{ backgroundColor: "rgba(201,169,110,0.08)", color: "var(--gold)", border: "1px solid rgba(201,169,110,0.15)" }}>
                            {action.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
