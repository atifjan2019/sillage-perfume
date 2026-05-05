"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { C } from "@/styles/constants";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { totalItems, setIsCartOpen } = useCart();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<{ id: number; slug: string; name: string; price: string; sale_price: string | null; images: string[] | null; category?: { name: string } }[]>([]);

    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }
        const t = setTimeout(() => {
            fetch(`/api/products?per_page=50`)
                .then((r) => r.json())
                .then((data) => {
                    const q = searchQuery.trim().toLowerCase();
                    const filtered = (data.data ?? []).filter((p: { name: string; category?: { name: string } }) =>
                        p.name.toLowerCase().includes(q) || p.category?.name?.toLowerCase().includes(q),
                    );
                    setSearchResults(filtered);
                })
                .catch(() => setSearchResults([]));
        }, 200);
        return () => clearTimeout(t);
    }, [searchQuery]);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/shop", label: "Shop" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ];

    const iconBtnStyle: React.CSSProperties = {
        background: "none",
        border: "none",
        cursor: "pointer",
        transition: "color 0.3s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    };

    const badgeStyle: React.CSSProperties = {
        position: "absolute",
        top: -6,
        right: -6,
        backgroundColor: C.gold,
        color: "#111",
        fontSize: 9,
        fontWeight: 700,
        width: 16,
        height: 16,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 1,
    };

    return (
        <>
            {/* Announcement bar */}
            <div style={{
                backgroundColor: C.gold,
                textAlign: "center",
                padding: "8px 0",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 400,
                color: "#111",
            }}>
                ✦ Free Shipping on Orders Over Rs. 5,000 ✦
            </div>

            <header style={{
                position: "sticky",
                top: 0,
                zIndex: 50,
                transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                backgroundColor: isScrolled ? "rgba(17,17,17,0.97)" : "#111",
                backdropFilter: isScrolled ? "blur(20px)" : undefined,
                boxShadow: isScrolled ? "0 2px 20px rgba(0,0,0,0.3)" : "none",
                borderBottom: `1px solid ${isScrolled ? "transparent" : "rgba(255,255,255,0.06)"}`,
            }}>
                <div style={{
                    maxWidth: 1400,
                    marginInline: "auto",
                    paddingInline: 24,
                    display: "grid",
                    gridTemplateColumns: "1fr auto 1fr",
                    alignItems: "center",
                    height: 72,
                }}>
                    {/* Left: nav */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <nav className="mobile-hide" style={{ display: "flex", alignItems: "center", gap: 32 }}>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="nav-link"
                                    style={{
                                        fontSize: 12,
                                        color: "#ffffff",
                                        letterSpacing: "0.18em",
                                        textTransform: "uppercase",
                                        textDecoration: "none",
                                        transition: "color 0.3s",
                                        position: "relative",
                                        fontWeight: 400,
                                        paddingBlock: 4,
                                    }}
                                >
                                    {link.label}
                                    <span className="nav-underline" style={{
                                        position: "absolute",
                                        bottom: -2,
                                        left: 0,
                                        width: 0,
                                        height: 1,
                                        backgroundColor: C.gold,
                                        transition: "width 0.3s",
                                    }} />
                                </Link>
                            ))}
                        </nav>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg-hidden"
                            style={{ ...iconBtnStyle, color: "#ffffff" }}
                            aria-label="Menu"
                        >
                            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>

                    {/* Center wordmark */}
                    <Link href="/" style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textDecoration: "none",
                    }}>
                        <span style={{
                            fontFamily: "var(--font-playfair), Georgia, serif",
                            fontSize: 26,
                            letterSpacing: "0.35em",
                            color: C.gold,
                            fontWeight: 400,
                            paddingLeft: "0.35em",
                        }}>
                            SILLAGE
                        </span>
                    </Link>

                    {/* Right icons */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 20 }}>
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="icon-hover"
                            style={{ ...iconBtnStyle, color: "#ffffff" }}
                            aria-label="Search"
                        >
                            <Search size={19} strokeWidth={1.5} />
                        </button>

                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="icon-hover"
                            style={{ ...iconBtnStyle, color: "#ffffff" }}
                            aria-label="Cart"
                        >
                            <ShoppingBag size={19} strokeWidth={1.5} />
                            {totalItems > 0 && (
                                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} style={badgeStyle}>
                                    {totalItems}
                                </motion.span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Search bar */}
                <AnimatePresence>
                    {isSearchOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ borderTop: "1px solid rgba(255,255,255,0.08)", overflow: "visible", backgroundColor: "#1a1a1a" }}
                        >
                            <div style={{ maxWidth: 600, marginInline: "auto", padding: "16px 24px", position: "relative" }}>
                                <div style={{ position: "relative" }}>
                                    <input
                                        type="text"
                                        placeholder="Search luxury fragrances..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        style={{
                                            width: "100%",
                                            backgroundColor: "rgba(255,255,255,0.05)",
                                            border: "1px solid rgba(255,255,255,0.12)",
                                            borderRadius: 0,
                                            color: "#fff",
                                            padding: "12px 48px 12px 20px",
                                            fontSize: 13,
                                            letterSpacing: "0.05em",
                                        }}
                                        autoFocus
                                    />
                                    <Search size={16} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", color: C.gold, opacity: 0.6 }} />
                                </div>

                                {searchQuery.trim().length > 0 && (
                                    <div style={{
                                        position: "absolute",
                                        left: 24,
                                        right: 24,
                                        top: "100%",
                                        backgroundColor: "#222",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        borderTop: "none",
                                        zIndex: 100,
                                        maxHeight: 300,
                                        overflowY: "auto",
                                    }}>
                                        {searchResults.length > 0 ? searchResults.map((p) => (
                                            <Link
                                                key={p.id}
                                                href={`/product/${p.slug}`}
                                                onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                                                className="search-result-item"
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 12,
                                                    padding: "12px 16px",
                                                    textDecoration: "none",
                                                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                                                    transition: "background-color 0.2s",
                                                }}
                                            >
                                                <div style={{ width: 40, height: 50, position: "relative", backgroundColor: "#333", flexShrink: 0 }}>
                                                    {p.images?.[0] && (
                                                        <Image src={p.images[0]} alt={p.name} fill style={{ objectFit: "cover" }} sizes="40px" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p style={{ color: "#fff", fontSize: 13, margin: 0, letterSpacing: "0.05em" }}>{p.name}</p>
                                                    <p style={{ color: "#888", fontSize: 11, margin: 0, marginTop: 2 }}>
                                                        {p.category?.name ?? ""} · Rs. {Number(p.sale_price ?? p.price).toLocaleString()}
                                                    </p>
                                                </div>
                                            </Link>
                                        )) : (
                                            <p style={{ color: "#666", fontSize: 13, padding: 16, textAlign: "center", margin: 0 }}>No products found</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mobile menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => setIsMobileMenuOpen(false)}
                                style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", zIndex: 998 }}
                            />
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
                                style={{
                                    position: "fixed",
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    width: 280,
                                    backgroundColor: "#1a1a1a",
                                    zIndex: 999,
                                    display: "flex",
                                    flexDirection: "column",
                                    boxShadow: "4px 0 24px rgba(0,0,0,0.4)",
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                                    <span style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 22, letterSpacing: "0.3em", color: C.gold, paddingLeft: "0.3em" }}>SILLAGE</span>
                                    <button onClick={() => setIsMobileMenuOpen(false)} style={{ ...iconBtnStyle, color: "#fff" }} aria-label="Close menu">
                                        <X size={22} />
                                    </button>
                                </div>
                                <nav style={{ display: "flex", flexDirection: "column", padding: "32px 24px", gap: 8 }}>
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="text-hover"
                                            style={{
                                                fontSize: 13,
                                                color: "#ffffff",
                                                letterSpacing: "0.2em",
                                                textTransform: "uppercase",
                                                padding: "12px 0",
                                                textDecoration: "none",
                                                transition: "color 0.3s",
                                                borderBottom: "1px solid rgba(255,255,255,0.06)",
                                            }}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </nav>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </header>
        </>
    );
}
