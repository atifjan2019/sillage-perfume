import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const perPageRaw = searchParams.get("per_page");
    const perPage = perPageRaw ? Math.max(1, parseInt(perPageRaw, 10)) : 50;
    const result = await db.listAllProducts(perPage);
    return NextResponse.json(result);
}

export async function POST(req: Request) {
    const body = await req.json().catch(() => ({}));
    const { category_id, name, description, price, sale_price, sku, stock, status } = body as {
        category_id?: number;
        name?: string;
        description?: string | null;
        price?: number;
        sale_price?: number | null;
        sku?: string | null;
        stock?: number;
        status?: "active" | "inactive";
    };
    if (!name?.trim() || !category_id || price == null || stock == null) {
        return NextResponse.json({ message: "name, category_id, price and stock are required" }, { status: 400 });
    }
    const product = await db.createProduct({
        category_id,
        name: name.trim(),
        description: description ?? null,
        price,
        sale_price: sale_price ?? null,
        sku: sku ?? null,
        stock,
        status,
    });
    return NextResponse.json({ data: product }, { status: 201 });
}
