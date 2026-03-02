"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Category } from "@/lib/types";

export default function AdminCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formName, setFormName] = useState("");
    const [formDesc, setFormDesc] = useState("");
    const [saving, setSaving] = useState(false);

    const load = () => {
        apiFetch("/admin/categories")
            .then((d) => setCategories(d.data))
            .catch(() => { })
            .finally(() => setLoading(false));
    };

    useEffect(() => { load(); }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await apiFetch("/admin/categories", {
                method: "POST",
                body: JSON.stringify({ name: formName, description: formDesc }),
            });
            setFormName("");
            setFormDesc("");
            setShowForm(false);
            load();
        } catch { alert("Failed to create"); }
        finally { setSaving(false); }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this category? Products in it will also be deleted.")) return;
        try {
            await apiFetch(`/admin/categories/${id}`, { method: "DELETE" });
            setCategories((c) => c.filter((x) => x.id !== id));
        } catch { alert("Failed to delete"); }
    };

    const inputStyle = { backgroundColor: "rgba(255,255,255,0.03)", color: "var(--cream)", border: "1px solid rgba(255,255,255,0.08)" };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-light tracking-wide" style={{ fontFamily: "var(--font-cormorant)", color: "var(--cream)" }}>
                    Categories
                </h1>
                <button onClick={() => setShowForm(!showForm)}
                    className="px-5 py-2.5 rounded-lg text-xs font-medium tracking-[0.1em] uppercase"
                    style={{ backgroundColor: "var(--gold)", color: "#0a0a0a" }}>
                    {showForm ? "Cancel" : "+ Add Category"}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleCreate} className="rounded-xl p-6 mb-6 space-y-4"
                    style={{ backgroundColor: "var(--charcoal)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <input required placeholder="Category Name" value={formName} onChange={(e) => setFormName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                    <textarea placeholder="Description (optional)" value={formDesc} onChange={(e) => setFormDesc(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none h-20" style={inputStyle} />
                    <button type="submit" disabled={saving}
                        className="px-6 py-2.5 rounded-lg text-xs font-medium tracking-[0.1em] uppercase disabled:opacity-50"
                        style={{ backgroundColor: "var(--gold)", color: "#0a0a0a" }}>
                        {saving ? "Creating..." : "Create Category"}
                    </button>
                </form>
            )}

            {loading ? (
                <div className="text-center py-20">
                    <div className="animate-spin w-6 h-6 border-2 rounded-full mx-auto" style={{ borderColor: "var(--gold)", borderTopColor: "transparent" }} />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((cat) => (
                        <div key={cat.id} className="rounded-xl p-5"
                            style={{ backgroundColor: "var(--charcoal)", border: "1px solid rgba(255,255,255,0.05)" }}>
                            <h3 className="text-sm font-medium mb-1" style={{ color: "var(--cream)" }}>{cat.name}</h3>
                            <p className="text-xs mb-2" style={{ color: "var(--gold-dark)" }}>{cat.slug}</p>
                            <p className="text-xs mb-3 line-clamp-2" style={{ color: "rgba(255,255,255,0.4)" }}>{cat.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                                    {cat.products_count || 0} products
                                </span>
                                <button onClick={() => handleDelete(cat.id)} className="text-[10px] tracking-wider uppercase px-2 py-1 rounded"
                                    style={{ color: "#fca5a5", backgroundColor: "rgba(220,38,38,0.08)" }}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
