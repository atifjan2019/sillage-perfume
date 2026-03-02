"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderNo = searchParams.get("order");

    return (
        <div className="min-h-screen flex items-center justify-center pt-20 px-4">
            <div className="text-center max-w-md">
                <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                    style={{ backgroundColor: "rgba(34,197,94,0.1)", border: "2px solid rgba(34,197,94,0.3)" }}>
                    <svg className="w-10 h-10" fill="none" stroke="#22c55e" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="text-3xl font-light tracking-wide mb-3"
                    style={{ fontFamily: "var(--font-cormorant)", color: "var(--cream)" }}>
                    Order Confirmed!
                </h1>
                {orderNo && (
                    <p className="text-sm mb-2" style={{ color: "var(--gold)" }}>
                        Order #{orderNo}
                    </p>
                )}
                <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Thank you for your order. You will receive a confirmation email shortly.
                </p>
                <Link href="/"
                    className="inline-block px-8 py-3 rounded-xl text-xs font-medium tracking-[0.15em] uppercase"
                    style={{ backgroundColor: "var(--gold)", color: "#0a0a0a" }}>
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}

export default function CheckoutSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <SuccessContent />
        </Suspense>
    );
}
