"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { CheckIcon } from "@/components/Icons";
import Select from "@/components/Select";

interface SeoSettings {
    default_title: string;
    default_description: string;
    keywords: string;
    og_image: string;
    twitter_handle: string;
    canonical_url: string;
    robots: string;
    google_site_verification: string;
    ga_measurement_id: string;
}

export default function SeoSettingsPage() {
    const [form, setForm] = useState<SeoSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        apiFetch("/admin/settings/seo")
            .then((d) => setForm(d.data))
            .catch(() => setError("Failed to load settings"))
            .finally(() => setLoading(false));
    }, []);

    const update = <K extends keyof SeoSettings>(key: K, value: SeoSettings[K]) => {
        setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form) return;
        setSaving(true);
        setError("");
        try {
            await apiFetch("/admin/settings/seo", {
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
            <h1 className="text-2xl font-light tracking-wide mb-2" style={{ fontFamily: "var(--font-playfair)", color: "var(--cream)" }}>
                SEO Settings
            </h1>
            <p className="text-xs mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
                Search engine metadata, social cards, and analytics IDs.
            </p>

            {error && (
                <div className="mb-6 px-4 py-3 rounded-lg text-sm" style={{ backgroundColor: "rgba(220,38,38,0.08)", color: "#fca5a5", border: "1px solid rgba(220,38,38,0.2)" }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
                <section className="rounded-xl p-6 space-y-5" style={{ backgroundColor: "var(--charcoal)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <h2 className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: "var(--gold)" }}>Meta</h2>
                    <Field label="Default Title">
                        <input value={form.default_title} onChange={(e) => update("default_title", e.target.value)} className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                    </Field>
                    <Field label="Default Description">
                        <textarea value={form.default_description} onChange={(e) => update("default_description", e.target.value)} className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none h-20" style={inputStyle} />
                    </Field>
                    <Field label="Keywords (comma separated)">
                        <input value={form.keywords} onChange={(e) => update("keywords", e.target.value)} className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                    </Field>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Canonical URL">
                            <input value={form.canonical_url} onChange={(e) => update("canonical_url", e.target.value)} className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                        </Field>
                        <Field label="Robots">
                            <Select
                                value={form.robots}
                                onChange={(v) => update("robots", v)}
                                options={[
                                    { value: "index, follow", label: "index, follow" },
                                    { value: "index, nofollow", label: "index, nofollow" },
                                    { value: "noindex, follow", label: "noindex, follow" },
                                    { value: "noindex, nofollow", label: "noindex, nofollow" },
                                ]}
                            />
                        </Field>
                    </div>
                </section>

                <section className="rounded-xl p-6 space-y-5" style={{ backgroundColor: "var(--charcoal)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <h2 className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: "var(--gold)" }}>Social</h2>
                    <Field label="Open Graph Image URL">
                        <input value={form.og_image} onChange={(e) => update("og_image", e.target.value)} placeholder="https://…/og.png" className="w-full px-4 py-3 rounded-lg text-sm outline-none placeholder:text-white/20" style={inputStyle} />
                    </Field>
                    <Field label="Twitter Handle">
                        <input value={form.twitter_handle} onChange={(e) => update("twitter_handle", e.target.value)} placeholder="@sillage" className="w-full px-4 py-3 rounded-lg text-sm outline-none placeholder:text-white/20" style={inputStyle} />
                    </Field>
                </section>

                <section className="rounded-xl p-6 space-y-5" style={{ backgroundColor: "var(--charcoal)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <h2 className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: "var(--gold)" }}>Analytics & Verification</h2>
                    <Field label="Google Site Verification">
                        <input value={form.google_site_verification} onChange={(e) => update("google_site_verification", e.target.value)} placeholder="content value of meta tag" className="w-full px-4 py-3 rounded-lg text-sm outline-none placeholder:text-white/20" style={inputStyle} />
                    </Field>
                    <Field label="Google Analytics Measurement ID">
                        <input value={form.ga_measurement_id} onChange={(e) => update("ga_measurement_id", e.target.value)} placeholder="G-XXXXXXX" className="w-full px-4 py-3 rounded-lg text-sm outline-none placeholder:text-white/20" style={inputStyle} />
                    </Field>
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
