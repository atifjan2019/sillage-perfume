import { Metadata } from "next";
import { db } from "@/lib/db";
import CategoryProducts from "./CategoryProducts";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const category = await db.getCategoryBySlug(slug);
    return {
        title: category ? `${category.name} | Sillage Perfume` : "Category | Sillage Perfume",
        description: category?.description || "Explore our perfume collection",
    };
}

export default async function CategoryPage({ params }: Props) {
    const { slug } = await params;
    const [category, productsResult] = await Promise.all([
        db.getCategoryBySlug(slug),
        db.listProducts({ categorySlug: slug, perPage: 20 }),
    ]);
    const products = productsResult.data;

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
