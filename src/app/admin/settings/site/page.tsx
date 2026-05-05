"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { CheckIcon } from "@/components/Icons";

interface SiteSettings {
    site_name: string;
    tagline: string;
    support_email: string;
    support_phone: string;
    address: string;
    currency: string;
    free_shipping_threshold: number;
    shipping_fee: number;
    footer_note: string;
}

export default function SiteSettingsPage() {
    const [form, setForm] = useState<SiteSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        apiFetch("/admin/settings/site")
            .then((d) => setForm(d.data))
            .catch(() => setError("Failed to load settings"))
            .finally(() => setLoading(false));
    }, []);

    const update = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => {
        setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form) return;
        setSaving(true);
        setError("");
        try {
            await apiFetch("/admin/settings/site", {
                method: "PUT",
                body: JSON.stringify(form),
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to save");
        } finally {
            setSaving(false);
        }
    };

    const inputStyle = {
        backgroundColor: "rgba(255,255,255,0.03)",
        color: "var(--cream)",
        border: "1px solid rgba(255,255,255,0.08)",
    };

    if (loading) {
        return (
            <div className="text-center py-20">
                <div className="animate-spin w-6 h-6 border-2 rounded-full mx-auto" style={{ borderColor: "var(--gold)", borderTopColor: "transparent" }} />
            </div>
        );
    }
    if (!form) {
        return <p className="text-sm" style={{ color: "#fca5a5" }}>{error || "Could not load settings"}</p>;
    }

    return (
        <div>
            <h1 className="text-2xl font-light tracking-wide mb-2" style={{ fontFamily: "var(--font-cormorant)", color: "var(--cream)" }}>
                Site Settings
            </h1>
            <p className="text-xs mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
                Brand name, contact details, and shipping rules.
            </p>

            {error && (
                <div className="mb-6 px-4 py-3 rounded-lg text-sm" style={{ backgroundColor: "rgba(220,38,38,0.08)", color: "#fca5a5", border: "1px solid rgba(220,38,38,0.2)" }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
                <section className="rounded-xl p-6 space-y-5" style={{ backgroundColor: "var(--charcoal)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <h2 className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: "var(--gold)" }}>Brand</h2>
                    <Field label="Site Name">
                        <input value={form.site_name} onChange={(e) => update("site_name", e.target.value)} className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                    </Field>
                    <Field label="Tagline">
                        <input value={form.tagline} onChange={(e) => update("tagline", e.target.value)} className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                    </Field>
                    <Field label="Footer Note">
                        <textarea value={form.footer_note} onChange={(e) => update("footer_note", e.target.value)} className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none h-20" style={inputStyle} />
                    </Field>
                </section>

                <section className="rounded-xl p-6 space-y-5" style={{ backgroundColor: "var(--charcoal)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <h2 className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: "var(--gold)" }}>Contact</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Support Email">
                            <input type="email" value={form.support_email} onChange={(e) => update("support_email", e.target.value)} className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                        </Field>
                        <Field label="Support Phone">
                            <input value={form.support_phone} onChange={(e) => update("support_phone", e.target.value)} className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                        </Field>
                    </div>
                    <Field label="Address">
                        <input value={form.address} onChange={(e) => update("address", e.target.value)} className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                    </Field>
                </section>

                <section className="rounded-xl p-6 space-y-5" style={{ backgroundColor: "var(--charcoal)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <h2 className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: "var(--gold)" }}>Commerce</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Field label="Currency">
                            <input value={form.currency} onChange={(e) => update("currency", e.target.value)} className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                        </Field>
                        <Field label="Shipping Fee">
                            <input type="number" value={form.shipping_fee} onChange={(e) => update("shipping_fee", parseFloat(e.target.value) || 0)} className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                        </Field>
                        <Field label="Free Shipping Over">
                            <input type="number" value={form.free_shipping_threshold} onChange={(e) => update("free_shipping_threshold", parseFloat(e.target.value) || 0)} className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                        </Field>
                    </div>
                </section>

                <div className="flex items-center gap-4">
                    <button type="submit" disabled={saving}
                        className="px-8 py-3 rounded-lg text-xs font-medium tracking-[0.15em] uppercase disabled:opacity-50"
                        style={{ background: "linear-gradient(135deg, var(--gold-dark), var(--gold))", color: "#0a0a0a" }}>
                        {saving ? "Saving…" : "Save Changes"}
                    </button>
                    {saved && (
                        <span className="inline-flex items-center gap-2 text-xs" style={{ color: "#22c55e" }}>
                            <CheckIcon size={14} /> Saved
                        </span>
                    )}
                </div>
            </form>
        </div>
    );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <label className="block text-xs mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</label>
            {children}
        </div>
    );
}
