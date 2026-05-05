import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get("category") ?? undefined;
    const perPageRaw = searchParams.get("per_page");
    const perPage = perPageRaw ? Math.max(1, parseInt(perPageRaw, 10)) : 20;
    const result = await db.listProducts({ categorySlug, perPage });
    return NextResponse.json(result);
}
