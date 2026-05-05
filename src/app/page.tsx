import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import HomeSections from "./HomeSections";

export default async function Home() {
  const [categories, productsResult] = await Promise.all([
    db.listCategories(),
    db.listProducts({ perPage: 8 }),
  ]);
  const products = productsResult.data;

  return <HomeSections categories={categories} products={products} />;
}

// Static imports kept here so we can prefetch images via Next.
export const dynamic = "force-static";
export const revalidate = 60;
void Image;
void Link;
