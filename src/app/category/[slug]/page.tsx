import { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import CategoryClient from "./CategoryClient";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

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
        db.listProducts({ categorySlug: slug, perPage: 50 }),
    ]);

    if (!category) {
        return (
            <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px", gap: 16 }}>
                <p style={{ color: "#666", fontSize: 14 }}>Category not found.</p>
                <Link href="/shop" style={{ color: "#c9a96e", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>Browse Shop</Link>
            </div>
        );
    }

    return <CategoryClient category={category} products={productsResult.data} />;
}
