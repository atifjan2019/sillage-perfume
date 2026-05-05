import Link from "next/link";

export default function NotFound() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-20"
            style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1511 50%, #0a0a0a 100%)" }}>

            {/* Decorative blurs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
                    style={{ backgroundColor: "var(--gold)" }} />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-5"
                    style={{ backgroundColor: "var(--gold-light)" }} />
            </div>

            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(rgba(201,169,110,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.3) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                }} />

            <div className="relative z-10 max-w-2xl mx-auto text-center">
                <p className="text-xs tracking-[0.4em] uppercase mb-6 animate-fade-in-up"
                    style={{ color: "var(--gold-dark)" }}>
                    — Lost in the Sillage —
                </p>

                <h1 className="font-light tracking-tight mb-6 animate-fade-in-up-delay-1 leading-none"
                    style={{
                        fontFamily: "var(--font-cormorant)",
                        color: "var(--cream)",
                        fontSize: "clamp(7rem, 22vw, 14rem)",
                    }}>
                    <span className="shimmer-text font-semibold italic">404</span>
                </h1>

                <div className="w-16 h-px mx-auto mb-8" style={{ backgroundColor: "var(--gold)" }} />

                <h2 className="text-2xl sm:text-3xl font-light tracking-wide mb-4 animate-fade-in-up-delay-2"
                    style={{ fontFamily: "var(--font-cormorant)", color: "var(--cream)" }}>
                    The Trail Has Faded
                </h2>

                <p className="text-sm sm:text-base max-w-md mx-auto mb-10 leading-relaxed animate-fade-in-up-delay-3"
                    style={{ color: "rgba(255,255,255,0.45)" }}>
                    The page you are seeking has drifted beyond our reach.
                    Even the finest fragrances dissipate — let us guide you back to the boutique.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up-delay-4">
                    <Link href="/"
                        className="px-10 py-4 rounded-xl text-xs font-medium tracking-[0.2em] uppercase transition-all duration-500"
                        style={{
                            background: "linear-gradient(135deg, var(--gold-dark), var(--gold))",
                            color: "#0a0a0a",
                            boxShadow: "0 4px 20px rgba(201,169,110,0.25)",
                        }}>
                        Return Home
                    </Link>
                    <Link href="/category/eau-de-parfum"
                        className="px-10 py-4 rounded-xl text-xs font-medium tracking-[0.2em] uppercase transition-all duration-500"
                        style={{ border: "1px solid rgba(201,169,110,0.3)", color: "var(--gold)" }}>
                        Browse Collection
                    </Link>
                </div>

                <p className="mt-12 text-xs tracking-widest animate-fade-in-up-delay-5"
                    style={{ color: "rgba(255,255,255,0.15)" }}>
                    SILLAGE — THE TRAIL OF SCENT
                </p>
            </div>
        </div>
    );
}
