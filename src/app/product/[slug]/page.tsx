import { Metadata } from "next";
import { db } from "@/lib/db";
import ProductDetail from "./ProductDetail";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const result = await db.getProductBySlug(slug);
    const product = result?.product ?? null;
    return {
        title: product ? `${product.name} | SWAN Perfumes` : "Product | SWAN",
        description: product?.description || "SWAN luxury perfume",
        openGraph: product ? {
            title: product.name,
            description: product.description || "",
            type: "website",
        } : undefined,
    };
}

export default async function ProductPage({ params }: Props) {
    const { slug } = await params;
    const result = await db.getProductBySlug(slug);

    if (!result) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <p style={{ color: "rgba(255,255,255,0.5)" }}>Product not found</p>
            </div>
        );
    }

    return <ProductDetail product={result.product} related={result.related} />;
}
