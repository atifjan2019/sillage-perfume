"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { Category } from "@/lib/types";
import Select from "@/components/Select";

export default function NewProduct() {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        category_id: "",
        name: "",
        description: "",
        price: "",
        sale_price: "",
        sku: "",
        stock: "0",
        status: "active",
    });

    useEffect(() => {
        apiFetch("/admin/categories").then((d) => setCategories(d.data)).catch(() => { });
    }, []);

    const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await apiFetch("/admin/products", {
                method: "POST",
                body: JSON.stringify({
                    ...form,
                    category_id: parseInt(form.category_id),
                    price: parseFloat(form.price),
                    sale_price: form.sale_price ? parseFloat(form.sale_price) : null,
                    stock: parseInt(form.stock),
                }),
            });
            router.push("/admin/products");
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to create product");
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        backgroundColor: "rgba(255,255,255,0.03)",
        color: "var(--cream)",
        border: "1px solid rgba(255,255,255,0.08)",
    };

    return (
        <div>
            <h1 className="text-2xl font-light tracking-wide mb-8" style={{ fontFamily: "var(--font-playfair)", color: "var(--cream)" }}>
                Add New Product
            </h1>

            {error && (
                <div className="mb-6 px-4 py-3 rounded-lg text-sm" style={{ backgroundColor: "rgba(220,38,38,0.08)", color: "#fca5a5", border: "1px solid rgba(220,38,38,0.2)" }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                <div className="rounded-xl p-6 space-y-5" style={{ backgroundColor: "var(--charcoal)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <h2 className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: "var(--gold)" }}>Basic Info</h2>

                    <div>
                        <label className="block text-xs mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Product Name *</label>
                        <input required value={form.name} onChange={(e) => update("name", e.target.value)}
                            className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                    </div>

                    <div>
                        <label className="block text-xs mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Category *</label>
                        <Select
                            required
                            name="category_id"
                            placeholder="Select category"
                            value={form.category_id}
                            onChange={(v) => update("category_id", v)}
                            options={categories.map((c) => ({ value: String(c.id), label: c.name }))}
                        />
                    </div>

                    <div>
                        <label className="block text-xs mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Description</label>
                        <textarea value={form.description} onChange={(e) => update("description", e.target.value)}
                            className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none h-24" style={inputStyle} />
                    </div>
                </div>

                <div className="rounded-xl p-6 space-y-5" style={{ backgroundColor: "var(--charcoal)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <h2 className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: "var(--gold)" }}>Pricing & Stock</h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Price (Rs.) *</label>
                            <input required type="number" step="0.01" value={form.price} onChange={(e) => update("price", e.target.value)}
                                className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                        </div>
                        <div>
                            <label className="block text-xs mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Sale Price (Rs.)</label>
                            <input type="number" step="0.01" value={form.sale_price} onChange={(e) => update("sale_price", e.target.value)}
                                className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>SKU</label>
                            <input value={form.sku} onChange={(e) => update("sku", e.target.value)}
                                className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                        </div>
                        <div>
                            <label className="block text-xs mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Stock *</label>
                            <input required type="number" value={form.stock} onChange={(e) => update("stock", e.target.value)}
                                className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Status</label>
                        <Select
                            value={form.status}
                            onChange={(v) => update("status", v)}
                            options={[
                                { value: "active", label: "Active" },
                                { value: "inactive", label: "Inactive" },
                            ]}
                        />
                    </div>
                </div>

                <div className="flex gap-3">
                    <button type="submit" disabled={loading}
                        className="px-8 py-3 rounded-lg text-xs font-medium tracking-[0.15em] uppercase disabled:opacity-50"
                        style={{ backgroundColor: "var(--gold)", color: "#0a0a0a" }}>
                        {loading ? "Creating..." : "Create Product"}
                    </button>
                    <button type="button" onClick={() => router.back()}
                        className="px-8 py-3 rounded-lg text-xs tracking-[0.15em] uppercase"
                        style={{ color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)" }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
