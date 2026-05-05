"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";

export default function Navbar() {
    const { itemCount } = useCart();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
            style={{ backgroundColor: "rgba(10,10,10,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Mobile menu button */}
                    <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2" style={{ color: "var(--cream)" }}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                    {/* Left nav */}
                    <nav className="hidden lg:flex items-center gap-8">
                        <Link href="/category/eau-de-parfum" className="text-xs tracking-[0.15em] uppercase transition-colors duration-300 hover:opacity-100" style={{ color: "rgba(255,255,255,0.5)" }}>
                            Eau de Parfum
                        </Link>
                        <Link href="/category/eau-de-toilette" className="text-xs tracking-[0.15em] uppercase transition-colors duration-300 hover:opacity-100" style={{ color: "rgba(255,255,255,0.5)" }}>
                            Eau de Toilette
                        </Link>
                        <Link href="/category/oud-collection" className="text-xs tracking-[0.15em] uppercase transition-colors duration-300 hover:opacity-100" style={{ color: "rgba(255,255,255,0.5)" }}>
                            Oud Collection
                        </Link>
                    </nav>

                    {/* Logo */}
                    <Link href="/" className="absolute left-1/2 -translate-x-1/2">
                        <h1 className="text-2xl sm:text-3xl tracking-[0.35em] font-light" style={{ fontFamily: "var(--font-cormorant)", color: "var(--gold)" }}>
                            SILLAGE
                        </h1>
                    </Link>

                    {/* Right nav */}
                    <div className="flex items-center gap-4 sm:gap-6">
                        <Link href="/about" className="hidden lg:block text-xs tracking-[0.15em] uppercase transition-colors duration-300" style={{ color: "rgba(255,255,255,0.5)" }}>
                            About
                        </Link>
                        <Link href="/contact" className="hidden lg:block text-xs tracking-[0.15em] uppercase transition-colors duration-300" style={{ color: "rgba(255,255,255,0.5)" }}>
                            Contact
                        </Link>

                        {/* Search */}
                        <button className="p-1 transition-colors duration-300" style={{ color: "rgba(255,255,255,0.5)" }}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                        {/* Account */}
                        <Link href="/login" className="p-1 transition-colors duration-300" style={{ color: "rgba(255,255,255,0.5)" }}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </Link>

                        {/* Cart */}
                        <Link href="/cart" className="p-1 relative transition-colors duration-300" style={{ color: "rgba(255,255,255,0.5)" }}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-medium flex items-center justify-center"
                                    style={{ backgroundColor: "var(--gold)", color: "#0a0a0a" }}>
                                    {itemCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="lg:hidden border-t" style={{ borderColor: "rgba(255,255,255,0.05)", backgroundColor: "rgba(10,10,10,0.95)" }}>
                    <nav className="px-6 py-6 space-y-4">
                        {[
                            { href: "/category/eau-de-parfum", label: "Eau de Parfum" },
                            { href: "/category/eau-de-toilette", label: "Eau de Toilette" },
                            { href: "/category/oud-collection", label: "Oud Collection" },
                            { href: "/about", label: "About" },
                            { href: "/contact", label: "Contact" },
                            { href: "/login", label: "Account" },
                        ].map((link) => (
                            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                                className="block text-sm tracking-[0.1em] uppercase py-2 transition-colors duration-300"
                                style={{ color: "rgba(255,255,255,0.6)" }}>
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
