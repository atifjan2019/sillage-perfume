"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { C } from "@/styles/constants";
import { useState, useEffect, useCallback } from "react";

const slides = [
    {
        image: "/images/hero-collection.jpg",
        subtitle: "The Sillage Collection",
        title: "Where Trail",
        titleAccent: "Meets Legacy",
        description:
            "An exquisite portfolio of luxury fragrances — composed from the world's rarest ingredients to leave an unforgettable trail.",
    },
    {
        image: "/images/hero-coastal.jpg",
        subtitle: "Inspired by the Sea",
        title: "Where Luxury Meets",
        titleAccent: "the Horizon",
        description:
            "Crafted against the backdrop of windswept coastlines, each fragrance captures the spirit of salt, light, and quiet luxury.",
    },
    {
        image: "/images/hero-sunset.jpg",
        subtitle: "Nature & Opulence",
        title: "Born from",
        titleAccent: "Golden Shores",
        description:
            "Presented on black marble, adorned with bougainvillea — a tribute to nature's elegance and the artistry of sillage.",
    },
];

const AUTOPLAY_MS = 5000;

function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
        setIsMobile(mql.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mql.addEventListener("change", handler);
        return () => mql.removeEventListener("change", handler);
    }, [breakpoint]);
    return isMobile;
}

export default function HeroSection() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);
    const isMobile = useIsMobile();

    const goTo = useCallback((index: number) => {
        setDirection(index > current ? 1 : -1);
        setCurrent(index);
    }, [current]);

    const next = useCallback(() => {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % slides.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(next, AUTOPLAY_MS);
        return () => clearInterval(timer);
    }, [next]);

    const slide = slides[current];

    const imageVariants = {
        enter: (dir: number) => ({ opacity: 0, scale: 1.08, x: dir > 0 ? 60 : -60 }),
        center: { opacity: 1, scale: 1, x: 0 },
        exit: (dir: number) => ({ opacity: 0, scale: 0.97, x: dir > 0 ? -60 : 60 }),
    };

    const textVariants = {
        enter: { opacity: 0, y: 30 },
        center: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    if (isMobile) {
        return (
            <section style={{ position: "relative", aspectRatio: "16 / 10", width: "100%", overflow: "hidden", backgroundColor: "#0a0a0a" }}>
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div key={current} custom={direction} variants={imageVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }} style={{ position: "absolute", inset: 0 }}>
                        <Image src={slide.image} alt={slide.subtitle} fill style={{ objectFit: "cover" }} priority sizes="100vw" />
                    </motion.div>
                </AnimatePresence>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.55))", zIndex: 2 }} />
                <div style={{ position: "absolute", inset: 0, zIndex: 10, padding: "0 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                    <AnimatePresence mode="wait">
                        <motion.div key={current} variants={textVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.5, ease: "easeOut" }}>
                            <p style={{ color: C.gold, fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", fontWeight: 400, margin: "0 0 10px" }}>{slide.subtitle}</p>
                            <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 26, fontWeight: 300, color: "#fff", letterSpacing: "0.06em", lineHeight: 1.3, margin: 0 }}>
                                {slide.title}<br />
                                <span style={{ color: C.gold, fontWeight: 400, fontStyle: "italic" }}>{slide.titleAccent}</span>
                            </h1>
                        </motion.div>
                    </AnimatePresence>
                    <Link href="/shop" className="btn-gold" style={{ display: "inline-flex", alignItems: "center", gap: 6, backgroundColor: C.gold, color: "#111", padding: "10px 20px", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, textDecoration: "none", marginTop: 16 }}>
                        Shop Now <ArrowRight size={12} />
                    </Link>
                </div>
                <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", zIndex: 20, display: "flex", alignItems: "center", gap: 8 }}>
                    {slides.map((_, i) => (
                        <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} style={{ width: i === current ? 22 : 6, height: 6, borderRadius: 3, border: "none", backgroundColor: i === current ? C.gold : "rgba(255,255,255,0.3)", cursor: "pointer", transition: "all 0.4s ease", padding: 0 }} />
                    ))}
                </div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, backgroundColor: "rgba(255,255,255,0.08)", zIndex: 20 }}>
                    <motion.div key={current} initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }} style={{ height: "100%", backgroundColor: C.gold }} />
                </div>
            </section>
        );
    }

    return (
        <section style={{ position: "relative", height: "88vh", minHeight: 600, overflow: "hidden", backgroundColor: "#0a0a0a" }}>
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div key={current} custom={direction} variants={imageVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }} style={{ position: "absolute", inset: 0 }}>
                    <Image src={slide.image} alt={slide.subtitle} fill style={{ objectFit: "cover", opacity: 0.55 }} priority sizes="100vw" />
                </motion.div>
            </AnimatePresence>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.65) 100%)", zIndex: 2 }} />
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)", zIndex: 2 }} />

            <div style={{ position: "relative", zIndex: 10, height: "100%", maxWidth: 1400, marginInline: "auto", paddingInline: 24, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", textAlign: "left" }}>
                <motion.div initial={{ width: 0 }} animate={{ width: 48 }} transition={{ duration: 0.8, delay: 0.3 }} style={{ height: 1, backgroundColor: C.gold, marginBottom: 28 }} />
                <AnimatePresence mode="wait">
                    <motion.div key={current} variants={textVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.6, ease: "easeOut" }} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <p style={{ color: C.gold, fontSize: 12, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 400, margin: 0, marginBlockEnd: 20 }}>{slide.subtitle}</p>
                        <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(40px, 6vw, 76px)", fontWeight: 300, color: "#fff", letterSpacing: "0.04em", lineHeight: 1.1, margin: 0, maxWidth: 720 }}>
                            {slide.title}<br />
                            <span style={{ color: C.gold, fontStyle: "italic", fontWeight: 400 }}>{slide.titleAccent}</span>
                        </h1>
                        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, fontWeight: 300, marginTop: 24, letterSpacing: "0.04em", lineHeight: 1.7, maxWidth: 480, marginBottom: 0 }}>
                            {slide.description}
                        </p>
                    </motion.div>
                </AnimatePresence>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9 }} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "flex-start", gap: 12, marginTop: 40 }}>
                    <Link href="/shop" className="btn-gold" style={{ display: "inline-flex", alignItems: "center", gap: 10, backgroundColor: C.gold, color: "#111", padding: "14px 32px", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, textDecoration: "none", transition: "all 0.3s", whiteSpace: "nowrap" }}>
                        Shop Collection <ArrowRight size={15} />
                    </Link>
                    <Link href="/about" className="link-hover" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.85)", padding: "14px 32px", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 300, textDecoration: "none", transition: "all 0.3s", whiteSpace: "nowrap" }}>
                        Our Story
                    </Link>
                </motion.div>
            </div>

            <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", zIndex: 20, display: "flex", alignItems: "center", gap: 10 }}>
                {slides.map((_, i) => (
                    <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} style={{ width: i === current ? 28 : 8, height: 8, borderRadius: 4, border: "none", backgroundColor: i === current ? C.gold : "rgba(255,255,255,0.3)", cursor: "pointer", transition: "all 0.4s ease", padding: 0 }} />
                ))}
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, backgroundColor: "rgba(255,255,255,0.08)", zIndex: 20 }}>
                <motion.div key={current} initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }} style={{ height: "100%", backgroundColor: C.gold }} />
            </div>
        </section>
    );
}
