import { db } from "@/lib/db";
import HomeSections from "./HomeSections";

export const revalidate = 60;

export default async function Home() {
  const [categories, productsResult] = await Promise.all([
    db.listCategories(),
    db.listProducts({ perPage: 8 }),
  ]);
  return <HomeSections categories={categories} products={productsResult.data} />;
}
