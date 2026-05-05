import { Metadata } from "next";
import { db } from "@/lib/db";
import ShopClient from "./ShopClient";

export const metadata: Metadata = {
    title: "Shop | Sillage Perfume",
    description: "Browse our complete luxury fragrance collection.",
};

export const revalidate = 60;

export default async function ShopPage() {
    const [productsResult, categories] = await Promise.all([
        db.listProducts({ perPage: 100 }),
        db.listCategories(),
    ]);
    return <ShopClient products={productsResult.data} categories={categories} />;
}
