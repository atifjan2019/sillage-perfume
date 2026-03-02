"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { apiFetch, setToken, setUser } from "@/lib/api";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await apiFetch("/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            });

            setToken(data.token);
            setUser(data.user);
            router.push("/");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Login failed";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Panel — Background Image */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <Image
                    src="/images/login-bg.png"
                    alt="SWAN Luxury"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

                {/* Branding on image */}
                <div className="relative z-10 flex flex-col justify-between p-12 w-full">
                    <div className="animate-fade-in-up">
                        <Link href="/" className="inline-block">
                            <h2
                                className="text-3xl tracking-[0.35em] font-light"
                                style={{ fontFamily: "var(--font-cormorant)", color: "var(--gold)" }}
                            >
                                SWAN
                            </h2>
                        </Link>
                    </div>

                    <div className="space-y-6 max-w-md animate-fade-in-up-delay-2">
                        <h1
                            className="text-5xl xl:text-6xl font-light leading-tight tracking-wide"
                            style={{ fontFamily: "var(--font-cormorant)", color: "var(--cream)" }}
                        >
                            The Art of
                            <br />
                            <span className="shimmer-text font-semibold italic">Fragrance</span>
                        </h1>
                        <p className="text-white/50 text-sm leading-relaxed tracking-wide">
                            Step into a world of exquisite scents crafted for the extraordinary.
                            Your personal fragrance journey begins here.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <div className="h-px w-12" style={{ backgroundColor: "var(--gold)" }} />
                            <span
                                className="text-xs tracking-[0.3em] uppercase"
                                style={{ color: "var(--gold)" }}
                            >
                                Since 2024
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel — Login Form */}
            <div
                className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative"
                style={{ backgroundColor: "var(--background)" }}
            >
                {/* Subtle background texture */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 25% 25%, var(--gold) 1px, transparent 1px)",
                        backgroundSize: "50px 50px",
                    }}
                />

                <div className="w-full max-w-md relative z-10">
                    {/* Mobile Brand Header */}
                    <div className="lg:hidden text-center mb-10 animate-fade-in-up">
                        <h2
                            className="text-3xl tracking-[0.35em] font-light shimmer-text"
                            style={{ fontFamily: "var(--font-cormorant)" }}
                        >
                            SWAN
                        </h2>
                        <p className="text-white/30 text-xs tracking-[0.2em] uppercase mt-2">
                            Luxury Perfumes
                        </p>
                    </div>

                    {/* Welcome text */}
                    <div className="mb-10 animate-fade-in-up-delay-1">
                        <h3
                            className="text-3xl sm:text-4xl font-light tracking-wide mb-3"
                            style={{ fontFamily: "var(--font-cormorant)", color: "var(--cream)" }}
                        >
                            Welcome Back
                        </h3>
                        <p className="text-white/40 text-sm tracking-wide">
                            Sign in to your account to continue your fragrance journey
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div
                            className="mb-6 px-5 py-3.5 rounded-lg border text-sm animate-fade-in-up"
                            style={{
                                backgroundColor: "rgba(220, 38, 38, 0.08)",
                                borderColor: "rgba(220, 38, 38, 0.2)",
                                color: "#fca5a5",
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                {error}
                            </div>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div className="animate-fade-in-up-delay-2">
                            <label
                                htmlFor="email"
                                className="block text-xs tracking-[0.15em] uppercase mb-2.5 transition-colors duration-300"
                                style={{ color: focusedField === "email" ? "var(--gold)" : "rgba(255,255,255,0.35)" }}
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <div
                                    className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300"
                                    style={{ color: focusedField === "email" ? "var(--gold)" : "rgba(255,255,255,0.2)" }}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setFocusedField("email")}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                    placeholder="your@email.com"
                                    className="w-full pl-12 pr-4 py-4 rounded-xl text-sm transition-all duration-300 outline-none placeholder:text-white/15"
                                    style={{
                                        backgroundColor: "var(--charcoal)",
                                        color: "var(--cream)",
                                        border: `1px solid ${focusedField === "email" ? "var(--gold)" : "rgba(255,255,255,0.06)"}`,
                                        boxShadow:
                                            focusedField === "email"
                                                ? "0 0 0 3px rgba(201, 169, 110, 0.1), inset 0 1px 2px rgba(0,0,0,0.3)"
                                                : "inset 0 1px 2px rgba(0,0,0,0.3)",
                                    }}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="animate-fade-in-up-delay-3">
                            <div className="flex items-center justify-between mb-2.5">
                                <label
                                    htmlFor="password"
                                    className="text-xs tracking-[0.15em] uppercase transition-colors duration-300"
                                    style={{
                                        color: focusedField === "password" ? "var(--gold)" : "rgba(255,255,255,0.35)",
                                    }}
                                >
                                    Password
                                </label>
                                <Link
                                    href="/forgot-password"
                                    className="text-xs tracking-wide transition-colors duration-300 hover:underline underline-offset-4"
                                    style={{ color: "var(--gold-dark)" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-light)")}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--gold-dark)")}
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <div
                                    className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300"
                                    style={{
                                        color: focusedField === "password" ? "var(--gold)" : "rgba(255,255,255,0.2)",
                                    }}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setFocusedField("password")}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-12 py-4 rounded-xl text-sm transition-all duration-300 outline-none placeholder:text-white/15"
                                    style={{
                                        backgroundColor: "var(--charcoal)",
                                        color: "var(--cream)",
                                        border: `1px solid ${focusedField === "password" ? "var(--gold)" : "rgba(255,255,255,0.06)"}`,
                                        boxShadow:
                                            focusedField === "password"
                                                ? "0 0 0 3px rgba(201, 169, 110, 0.1), inset 0 1px 2px rgba(0,0,0,0.3)"
                                                : "inset 0 1px 2px rgba(0,0,0,0.3)",
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-300"
                                    style={{ color: "rgba(255,255,255,0.25)" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                            />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember me */}
                        <div className="flex items-center gap-3 animate-fade-in-up-delay-4">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="peer sr-only"
                                />
                                <label
                                    htmlFor="remember"
                                    className="w-5 h-5 rounded-md cursor-pointer flex items-center justify-center transition-all duration-300 border peer-checked:border-transparent"
                                    style={{
                                        backgroundColor: "var(--charcoal)",
                                        borderColor: "rgba(255,255,255,0.1)",
                                    }}
                                >
                                    <svg
                                        className="w-3 h-3 hidden peer-checked:block"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        style={{ color: "var(--gold)" }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                </label>
                            </div>
                            <label
                                htmlFor="remember"
                                className="text-sm cursor-pointer select-none"
                                style={{ color: "rgba(255,255,255,0.4)" }}
                            >
                                Remember me
                            </label>
                        </div>

                        {/* Submit */}
                        <div className="animate-fade-in-up-delay-4 pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 rounded-xl text-sm font-medium tracking-[0.15em] uppercase transition-all duration-500 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{
                                    background: "linear-gradient(135deg, var(--gold-dark), var(--gold), var(--gold-dark))",
                                    backgroundSize: "200% auto",
                                    color: "#0a0a0a",
                                    boxShadow: "0 4px 20px rgba(201, 169, 110, 0.25)",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundPosition = "right center";
                                    e.currentTarget.style.boxShadow = "0 6px 30px rgba(201, 169, 110, 0.4)";
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundPosition = "left center";
                                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(201, 169, 110, 0.25)";
                                    e.currentTarget.style.transform = "translateY(0)";
                                }}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                fill="none"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                            />
                                        </svg>
                                        Signing In...
                                    </div>
                                ) : (
                                    "Sign In"
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-8 animate-fade-in-up-delay-5">
                        <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
                        <span className="text-xs tracking-[0.1em]" style={{ color: "rgba(255,255,255,0.2)" }}>
                            OR
                        </span>
                        <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
                    </div>

                    {/* Register link */}
                    <div className="text-center animate-fade-in-up-delay-5">
                        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/register"
                                className="font-medium transition-all duration-300 hover:underline underline-offset-4"
                                style={{ color: "var(--gold)" }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-light)")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--gold)")}
                            >
                                Create Account
                            </Link>
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-12 text-center animate-fade-in-up-delay-5">
                        <p className="text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.15)" }}>
                            © 2024 SWAN PERFUMES. ALL RIGHTS RESERVED.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
