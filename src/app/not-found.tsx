import Link from "next/link";

export default function NotFound() {
    return (
        <section style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px", backgroundColor: "#ffffff", textAlign: "center" }}>
            <div style={{ maxWidth: 640 }}>
                <p style={{ color: "#c9a96e", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>Lost in the Sillage</p>
                <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(80px, 18vw, 160px)", fontWeight: 300, color: "#1a1a1a", letterSpacing: "0.04em", lineHeight: 1, margin: 0 }}>
                    <span style={{ color: "#c9a96e", fontStyle: "italic" }}>404</span>
                </h1>
                <hr style={{ width: 64, height: 1, backgroundColor: "#c9a96e", marginTop: 16, marginBottom: 24, marginInline: "auto", border: "none" }} />
                <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 28, fontWeight: 300, color: "#1a1a1a", letterSpacing: "0.04em", margin: 0 }}>
                    The Trail Has Faded
                </h2>
                <p style={{ color: "#666", fontSize: 14, marginTop: 16, lineHeight: 1.8, maxWidth: 460, marginInline: "auto", marginBottom: 32 }}>
                    The page you are seeking has drifted beyond our reach. Even the finest fragrances dissipate — let us guide you back to the boutique.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
                    <Link href="/" className="btn-gold" style={{ display: "inline-block", backgroundColor: "#c9a96e", color: "#fff", padding: "14px 32px", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none", transition: "background-color 0.3s" }}>
                        Return Home
                    </Link>
                    <Link href="/shop" className="btn-outline" style={{ display: "inline-block", border: "1px solid #c9a96e", color: "#c9a96e", padding: "14px 32px", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none", transition: "all 0.3s" }}>
                        Browse Collection
                    </Link>
                </div>
            </div>
        </section>
    );
}
