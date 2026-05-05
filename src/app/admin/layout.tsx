"use client";

import { useEffect, useState, ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getToken, getUser, removeToken, removeUser } from "@/lib/api";

export default function AdminLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<{ name: string; role: string } | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const token = getToken();
        const u = getUser();
        if (!token || !u || u.role !== "admin") {
            router.push("/login");
            return;
        }
        setUser(u);
    }, [router]);

    const handleLogout = () => {
        removeToken();
        removeUser();
        router.push("/login");
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--background)" }}>
                <div className="animate-spin w-6 h-6 border-2 rounded-full" style={{ borderColor: "var(--gold)", borderTopColor: "transparent" }} />
            </div>
        );
    }

    const navItems = [
        { href: "/admin", label: "Dashboard", icon: "📊" },
        { href: "/admin/products", label: "Products", icon: "🧴" },
        { href: "/admin/categories", label: "Categories", icon: "📂" },
        { href: "/admin/orders", label: "Orders", icon: "📦" },
    ];

    return (
        <div className="min-h-screen flex" style={{ backgroundColor: "var(--background)" }}>
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 lg:translate-x-0 lg:static ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
                style={{ backgroundColor: "var(--charcoal)", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 flex items-center justify-between">
                        <Link href="/admin">
                            <h1 className="text-xl tracking-[0.3em] font-light" style={{ fontFamily: "var(--font-cormorant)", color: "var(--gold)" }}>
                                SILLAGE
                            </h1>
                            <p className="text-[10px] tracking-[0.2em] uppercase mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>Admin Panel</p>
                        </Link>
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden" style={{ color: "rgba(255,255,255,0.5)" }}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 px-3 py-4 space-y-1">
                        {navItems.map((item) => {
                            const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                            return (
                                <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200"
                                    style={{
                                        backgroundColor: active ? "rgba(201,169,110,0.1)" : "transparent",
                                        color: active ? "var(--gold)" : "rgba(255,255,255,0.5)",
                                        border: active ? "1px solid rgba(201,169,110,0.15)" : "1px solid transparent",
                                    }}>
                                    <span>{item.icon}</span>
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User */}
                    <div className="p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"
                                style={{ backgroundColor: "rgba(201,169,110,0.15)", color: "var(--gold)" }}>
                                {user.name[0]}
                            </div>
                            <div>
                                <p className="text-xs font-medium" style={{ color: "var(--cream)" }}>{user.name}</p>
                                <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>Administrator</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Link href="/" className="flex-1 py-2 rounded-lg text-[10px] tracking-wider uppercase text-center"
                                style={{ backgroundColor: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                View Store
                            </Link>
                            <button onClick={handleLogout} className="flex-1 py-2 rounded-lg text-[10px] tracking-wider uppercase"
                                style={{ backgroundColor: "rgba(220,38,38,0.08)", color: "#fca5a5", border: "1px solid rgba(220,38,38,0.15)" }}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Main */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top bar */}
                <header className="h-16 flex items-center px-4 sm:px-6 lg:hidden"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <button onClick={() => setSidebarOpen(true)} style={{ color: "rgba(255,255,255,0.5)" }}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <span className="ml-4 text-sm tracking-[0.2em]" style={{ fontFamily: "var(--font-cormorant)", color: "var(--gold)" }}>
                        SILLAGE ADMIN
                    </span>
                </header>

                {/* Content */}
                <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
