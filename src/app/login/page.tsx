"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, KeyRound, ArrowRight } from "lucide-react";
import { apiFetch, setToken, setUser } from "@/lib/api";
import { C } from "@/styles/constants";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passcode, setPasscode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const payload = passcode.trim() ? { passcode: passcode.trim() } : { email, password };
            const data = await apiFetch("/auth/login", { method: "POST", body: JSON.stringify(payload) });
            setToken(data.token);
            setUser(data.user);
            router.push("/");
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const handlePasscodeSubmit = async () => {
        if (!passcode.trim()) return;
        setError("");
        setLoading(true);
        try {
            const data = await apiFetch("/auth/login", { method: "POST", body: JSON.stringify({ passcode: passcode.trim() }) });
            setToken(data.token);
            setUser(data.user);
            router.push("/");
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Invalid passcode");
        } finally {
            setLoading(false);
        }
    };

    const inputStyle: React.CSSProperties = {
        width: "100%",
        backgroundColor: "#fff",
        color: C.text,
        border: `1px solid ${C.border}`,
        padding: "12px 14px 12px 44px",
        fontSize: 14,
        letterSpacing: "0.03em",
        outline: "none",
        transition: "border-color 0.2s",
    };

    const iconLeft: React.CSSProperties = {
        position: "absolute",
        left: 14,
        top: "50%",
        transform: "translateY(-50%)",
        color: C.gold,
    };

    return (
        <div style={{ minHeight: "100vh", display: "flex", backgroundColor: C.bg }}>
            {/* Left hero panel */}
            <div style={{ position: "relative", overflow: "hidden", flex: "0 0 50%" }} className="mobile-hide">
                <Image src="/images/login-bg.png" alt="Sillage Luxury" fill style={{ objectFit: "cover" }} priority sizes="50vw" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.25), rgba(0,0,0,0.5))" }} />
                <div style={{ position: "relative", zIndex: 10, height: "100%", padding: 48, display: "flex", flexDirection: "column", justifyContent: "space-between", color: "#fff" }}>
                    <Link href="/" style={{ textDecoration: "none" }}>
                        <Image src="/images/Sillage-perfumes.png" alt="Sillage" width={400} height={140} style={{ objectFit: "contain", height: 42, width: "auto" }} />
                    </Link>

                    <div style={{ maxWidth: 440 }}>
                        <p style={{ color: C.gold, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 14 }}>Welcome Back</p>
                        <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 300, color: "#fff", lineHeight: 1.15, letterSpacing: "0.04em", margin: 0 }}>
                            The Art of
                            <br />
                            <span style={{ color: C.gold, fontStyle: "italic" }}>Fragrance</span>
                        </h1>
                        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, lineHeight: 1.7, marginTop: 18 }}>
                            Step into a world of exquisite scents crafted for the extraordinary. Your personal fragrance journey begins here.
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 24 }}>
                            <div style={{ width: 40, height: 1, backgroundColor: C.gold }} />
                            <span style={{ color: C.gold, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" }}>Since 2024</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right form panel */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px", backgroundColor: C.bg }}>
                <div style={{ width: "100%", maxWidth: 420 }}>
                    {/* Mobile logo */}
                    <div className="lg-hidden" style={{ display: "none", textAlign: "center", marginBottom: 32 }}>
                        <Image src="/images/sillagelogo.avif" alt="Sillage" width={84} height={84} style={{ objectFit: "contain", height: 56, width: "auto", display: "inline-block" }} />
                    </div>

                    <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 32, fontWeight: 300, color: C.text, letterSpacing: "0.04em", margin: 0, marginBottom: 8 }}>
                        Welcome Back
                    </h2>
                    <p style={{ color: C.textMuted, fontSize: 14, marginBottom: 28 }}>
                        Sign in to continue your fragrance journey.
                    </p>

                    {error && (
                        <div style={{ marginBottom: 20, padding: "12px 14px", border: "1px solid rgba(220,38,38,0.3)", backgroundColor: "rgba(220,38,38,0.05)", color: "#b91c1c", fontSize: 13 }}>
                            {error}
                        </div>
                    )}

                    {/* Quick passcode */}
                    <div style={{ marginBottom: 24 }}>
                        <label style={{ display: "block", color: C.textMuted, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>
                            Quick Access — Passcode
                        </label>
                        <div style={{ display: "flex", gap: 8 }}>
                            <div style={{ position: "relative", flex: 1 }}>
                                <KeyRound size={16} style={iconLeft} strokeWidth={1.5} />
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    autoComplete="off"
                                    value={passcode}
                                    onChange={(e) => setPasscode(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handlePasscodeSubmit(); } }}
                                    placeholder="Enter passcode"
                                    style={{ ...inputStyle, letterSpacing: passcode ? "0.3em" : "0.03em" }}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handlePasscodeSubmit}
                                disabled={loading || !passcode.trim()}
                                className="btn-gold"
                                style={{
                                    backgroundColor: C.gold,
                                    color: "#fff",
                                    border: "none",
                                    padding: "0 22px",
                                    fontSize: 11,
                                    letterSpacing: "0.2em",
                                    textTransform: "uppercase",
                                    fontWeight: 500,
                                    cursor: loading || !passcode.trim() ? "not-allowed" : "pointer",
                                    opacity: loading || !passcode.trim() ? 0.5 : 1,
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 6,
                                    transition: "background-color 0.3s",
                                }}
                            >
                                Enter <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                        <div style={{ flex: 1, height: 1, backgroundColor: C.borderLight }} />
                        <span style={{ color: C.textLight, fontSize: 10, letterSpacing: "0.25em" }}>OR SIGN IN</span>
                        <div style={{ flex: 1, height: 1, backgroundColor: C.borderLight }} />
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <div>
                            <label style={{ display: "block", color: C.textMuted, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>
                                Email Address
                            </label>
                            <div style={{ position: "relative" }}>
                                <Mail size={16} style={iconLeft} strokeWidth={1.5} />
                                <input
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    style={inputStyle}
                                />
                            </div>
                        </div>

                        <div>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                                <label style={{ color: C.textMuted, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                                    Password
                                </label>
                                <Link href="#" className="text-hover" style={{ color: C.goldDark, fontSize: 11, textDecoration: "none" }}>
                                    Forgot password?
                                </Link>
                            </div>
                            <div style={{ position: "relative" }}>
                                <Lock size={16} style={iconLeft} strokeWidth={1.5} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    style={{ ...inputStyle, paddingRight: 44 }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: C.textLight, display: "flex", alignItems: "center" }}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-gold"
                            style={{
                                width: "100%",
                                backgroundColor: C.gold,
                                color: "#fff",
                                border: "none",
                                padding: "14px 0",
                                fontSize: 12,
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                fontWeight: 500,
                                cursor: "pointer",
                                opacity: loading ? 0.6 : 1,
                                marginTop: 8,
                                transition: "background-color 0.3s",
                            }}
                        >
                            {loading ? "Signing In…" : "Sign In"}
                        </button>
                    </form>

                    <p style={{ color: C.textMuted, fontSize: 13, textAlign: "center", marginTop: 32 }}>
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="text-hover" style={{ color: C.gold, textDecoration: "none", fontWeight: 500 }}>
                            Create Account
                        </Link>
                    </p>

                    <p style={{ marginTop: 40, textAlign: "center", color: C.textLight, fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase" }}>
                        © 2026 Sillage Perfume
                    </p>
                </div>
            </div>
        </div>
    );
}
