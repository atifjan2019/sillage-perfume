import Link from "next/link";
import { db } from "@/lib/db";
import HomeProducts from "./HomeProducts";

export default async function Home() {
  const [categories, productsResult] = await Promise.all([
    db.listCategories(),
    db.listProducts({ perPage: 8 }),
  ]);
  const products = productsResult.data;

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1511 50%, #0a0a0a 100%)" }}>
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{ backgroundColor: "var(--gold)" }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-5"
            style={{ backgroundColor: "var(--gold-light)" }} />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: "linear-gradient(rgba(201,169,110,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.3) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <p className="text-xs tracking-[0.4em] uppercase mb-6" style={{ color: "var(--gold-dark)" }}>
              — Luxury Fragrances —
            </p>
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-wide mb-6 animate-fade-in-up-delay-1"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--cream)" }}>
            Discover Your
            <br />
            <span className="shimmer-text font-semibold italic">Signature Scent</span>
          </h1>
          <p className="text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed animate-fade-in-up-delay-2"
            style={{ color: "rgba(255,255,255,0.4)" }}>
            Each Sillage fragrance is a masterwork — meticulously composed from the world&apos;s rarest ingredients to create an unforgettable sensory experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up-delay-3">
            <Link href="/category/eau-de-parfum"
              className="px-10 py-4 rounded-xl text-xs font-medium tracking-[0.2em] uppercase transition-all duration-500"
              style={{ background: "linear-gradient(135deg, var(--gold-dark), var(--gold))", color: "#0a0a0a", boxShadow: "0 4px 20px rgba(201,169,110,0.25)" }}>
              Shop Collection
            </Link>
            <Link href="/about"
              className="px-10 py-4 rounded-xl text-xs font-medium tracking-[0.2em] uppercase transition-all duration-500"
              style={{ border: "1px solid rgba(201,169,110,0.3)", color: "var(--gold)" }}>
              Our Story
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in-up-delay-5">
          <div className="w-px h-16" style={{ background: "linear-gradient(to bottom, transparent, var(--gold-dark))" }} />
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold-dark)" }}>Collections</p>
          <h2 className="text-3xl sm:text-4xl font-light tracking-wide" style={{ fontFamily: "var(--font-cormorant)", color: "var(--cream)" }}>
            Explore Our World
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/category/${cat.slug}`}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer"
              style={{ backgroundColor: "var(--charcoal)" }}>
              {/* Background */}
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{ background: `linear-gradient(135deg, rgba(201,169,110,${cat.id * 0.03 + 0.02}), rgba(201,169,110,${cat.id * 0.05 + 0.08}))` }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent)" }} />
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: "var(--gold)" }}>
                  {cat.products_count} {cat.products_count === 1 ? "fragrance" : "fragrances"}
                </p>
                <h3 className="text-2xl font-light tracking-wide mb-2" style={{ fontFamily: "var(--font-cormorant)", color: "var(--cream)" }}>
                  {cat.name}
                </h3>
                <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {cat.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs tracking-[0.15em] uppercase group-hover:gap-3 transition-all duration-300" style={{ color: "var(--gold)" }}>
                  Explore
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold-dark)" }}>Featured</p>
            <h2 className="text-3xl sm:text-4xl font-light tracking-wide" style={{ fontFamily: "var(--font-cormorant)", color: "var(--cream)" }}>
              Our Finest Selection
            </h2>
          </div>
          <Link href="/category/eau-de-parfum" className="hidden sm:flex items-center gap-2 text-xs tracking-[0.15em] uppercase transition-colors duration-300" style={{ color: "var(--gold)" }}>
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
        <HomeProducts products={products} />
      </section>

      {/* Brand Story Banner */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #151210, #1a1511, #151210)" }}>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/3 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: "var(--gold)" }} />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: "var(--gold-dark)" }}>The Sillage Promise</p>
          <h2 className="text-3xl sm:text-5xl font-light tracking-wide mb-6 leading-tight"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--cream)" }}>
            Where Artistry Meets
            <br />
            <span style={{ color: "var(--gold)" }}>Olfactory Excellence</span>
          </h2>
          <p className="text-sm leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
            Every Sillage creation begins with a vision — a story waiting to be told through scent. Our master perfumers source only the finest raw materials from across the globe.
          </p>
          <Link href="/about"
            className="inline-block px-10 py-4 rounded-xl text-xs font-medium tracking-[0.2em] uppercase transition-all duration-500"
            style={{ border: "1px solid rgba(201,169,110,0.3)", color: "var(--gold)" }}>
            Discover Our Heritage
          </Link>
        </div>
      </section>
    </div>
  );
}
