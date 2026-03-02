import { Metadata } from "next";
import { Product } from "@/lib/types";
import ProductDetail from "./ProductDetail";

const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

type Props = { params: Promise<{ slug: string }> };

async function getProduct(slug: string) {
    const res = await fetch(`${API}/products/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const data = await getProduct(slug);
    const product: Product | null = data?.data || null;
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
    const data = await getProduct(slug);

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <p style={{ color: "rgba(255,255,255,0.5)" }}>Product not found</p>
            </div>
        );
    }

    return <ProductDetail product={data.data} related={data.related} />;
}
