import Link from "next/link";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="text-center space-y-6 animate-fade-in-up">
        <h1
          className="text-6xl font-light tracking-[0.4em] shimmer-text"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          SWAN
        </h1>
        <p
          className="text-xs tracking-[0.3em] uppercase"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Luxury Perfumes — Coming Soon
        </p>
        <div className="pt-8">
          <Link
            href="/login"
            className="inline-block px-10 py-3.5 rounded-xl text-xs font-medium tracking-[0.2em] uppercase transition-all duration-500"
            style={{
              border: "1px solid var(--gold)",
              color: "var(--gold)",
            }}
            onMouseEnter={() => { }}
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
