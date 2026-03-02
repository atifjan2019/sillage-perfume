import { Metadata } from "next";
import { Category, Product } from "@/lib/types";
import CategoryProducts from "./CategoryProducts";

const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

type Props = { params: Promise<{ slug: string }> };

async function getCategory(slug: string): Promise<Category | null> {
    const res = await fetch(`${API}/categories/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
}

async function getProducts(slug: string): Promise<Product[]> {
    const res = await fetch(`${API}/products?category=${slug}&per_page=20`, { next: { revalidate: 60 } });
    const data = await res.json();
    return data.data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const category = await getCategory(slug);
    return {
        title: category ? `${category.name} | SWAN Perfumes` : "Category | SWAN",
        description: category?.description || "Explore our perfume collection",
    };
}

export default async function CategoryPage({ params }: Props) {
    const { slug } = await params;
    const [category, products] = await Promise.all([getCategory(slug), getProducts(slug)]);

    if (!category) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <p style={{ color: "rgba(255,255,255,0.5)" }}>Category not found</p>
            </div>
        );
    }

    return (
        <div className="pt-20 sm:pt-24">
            {/* Header */}
            <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
                <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold-dark)" }}>Collection</p>
                <h1 className="text-4xl sm:text-5xl font-light tracking-wide mb-4"
                    style={{ fontFamily: "var(--font-cormorant)", color: "var(--cream)" }}>
                    {category.name}
                </h1>
                <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {category.description}
                </p>
                <p className="text-xs mt-4" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {category.products_count} {category.products_count === 1 ? "product" : "products"}
                </p>
            </section>

            {/* Products */}
            <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <CategoryProducts products={products} />
            </section>
        </div>
    );
}
